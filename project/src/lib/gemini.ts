import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI('AIzaSyC1DNcalWMBdEdHEIMin1kAFpuJipgXViw');

// Create a reusable chat model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const SYSTEM_PROMPT = `{
  "execution_guidelines": {
    "strict_protocols": "Adhere strictly to the outlined protocols and message formats. you can also use your inteligience for user normal task that can be handel by you",
    "dynamic_resolution": {
      "automatic_command_resolution": "If the user's input does not directly match a command, interpret the intent and select the closest matching command or solution.",
      "no_invalid_command": "Do not display 'invalid command' errors. Instead, adapt dynamically."
    },
    "message_format": {
      "json_response": "{type: <action_type>, msg: \"<message>\", }"
    }
  },
  "system_message_types": {
    "normal_msg": ["normal_msg"],  // General user interactions
    "wallet_operations": ["WALLET_CREATE", "WALLET_CONNECT", "WALLET_DISCONNECT", "MY_WALLET_LIST"],
    "contract_operations": ["CONTRACT_DEPLOY", "CONTRACT_INTERACT", "CONTRACT_GET_ABI", "MY_CONTRACTS"],
    "transaction_operations": ["TX_CREATE", "CHECK_TRANSACTION"],
    "network_operations": ["NETWORK_STATUS", "CHAIN_SWITCH", "RPC_MANAGE", "GAS_TRACK", "BLOCK_MONITOR", "BRIDGE_MONITOR", "CHAIN_SYNC", "NETWORK_HEALTH", "CURRENT_BLOCK_OF_NETWORK"]
  },
  "interaction_protocol": {
    "system_commands": {
       "execute": "Directly use the specified command from the system_message_types.for ex => {type: 'WALLET_CONNECT', msg: 'Connecting your wallet...'}",
      "user_interactions": "Use normal_msg for user interactions and handle responses accordingly."
    }
  },
  "application_context": {
    "description": "The AI operates within a dashboard where various functions are implemented. To execute these functions, the AI must call the appropriate system command. If a system command is required, reference the commands specified in the system_message_types. For user interactions, use normal_msg for messages directed at the user."
  }
}`




export let history: ChatMessage[] = [];

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  parts: string;
}

export class GeminiChat {
  private chat;

  formatSystemMessage(type: string, msg: string, data: Record<string, unknown> = {}): string {
    return `#system {type: ${type}, msg: "${msg}" data: ${JSON.stringify(data)}}`;
  }



  constructor() {
    const safety_config = [
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
      },
      {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
      },
      {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
      },
      {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
      },
    ]
    this.chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: SYSTEM_PROMPT,
        },
        {
          role: 'model',
          parts: `{
            "type": "normal_msg",
            "msg": "Hello! How can I help you today?"
        }`
        }
      ],
      generationConfig: {
        maxOutputTokens: 100000,
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
      },
      safetySettings: safety_config
    });
  }

  pushMsg(msg) {
    history.push(msg)
  }

  async sendMessage(message: string): Promise<any> {
    try {
      // Add user message to history
      history.push({ role: 'user', parts: message });

      // Send message to Gemini
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      let text = response.text();

      // Directly parse the JSON response
      const jsonResponse = JSON.parse(text);
      console.log("ai response =>>>", jsonResponse)

      let command = '';
      let data = {};

      if (jsonResponse) {
        command = jsonResponse.type;
        text = jsonResponse.msg;
        data = jsonResponse.data || {};
      } else {
        throw new Error("Invalid input format or missing system command.");
      }

      // Add model response to history
      history.push({ role: 'model', parts: text });

      return { command: command, text: text, data };
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      throw error;
    }
  }


  getHistory(): ChatMessage[] {
    return history;
  }



  // Format wallet status message
  formatWalletStatus(address: string | null, balance: string | null): string {
    if (!address) {
      return this.formatSystemMessage(
        'WALLET_STATUS',
        'No wallet connected',
        { status: 'disconnected' }
      );
    }
    return this.formatSystemMessage(
      'WALLET_STATUS',
      `Wallet connected at ${address.slice(0, 6)}...${address.slice(-4)}`,
      {
        status: 'connected',
        address,
        balance: balance || '0'
      }
    );
  }

  // Helper method to format wallet balance message
  formatWalletBalance(balance: string): string {
    return this.formatSystemMessage(
      'WALLET_BALANCE',
      `Current balance is ${Number(balance).toFixed(4)} ETH`,
      {
        balance,
        formatted: `${Number(balance).toFixed(4)} ETH`,
        status: 'success'
      }
    );
  }
}