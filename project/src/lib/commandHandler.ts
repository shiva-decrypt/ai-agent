
import { ethers } from "ethers";
import { GeminiChat, history } from "./gemini";
import { WalletManager } from "./wallet";

export const HandleWalletOperation = async ({ command, messages, setMessages, botMsg }) => {
  const wallet = new WalletManager();
  const gemini = new GeminiChat();

  console.log("commands =>", command);
  let userMessage;
  let balance
  let address

  switch (command) {
    case "WALLET_CONNECT":
      await wallet.connect();
      userMessage = {
        id: messages.length + 1,
        type: 'ai',
        content: `Wallet connected: ${wallet.getAddress()}`,
        timestamp: new Date(),
      };
      history.push({ role: 'systemCommand', parts: userMessage.content })
      setMessages(prev => [...prev, userMessage]);
      break;
    case "CONNECT_WALLET":
      await wallet.connect();
      userMessage = {
        id: messages.length + 1,
        type: 'ai',
        content: `Wallet connected: ${wallet.getAddress()}`,
        timestamp: new Date(),
      };
      history.push({ role: 'systemCommand', parts: userMessage.content })
      setMessages(prev => [...prev, userMessage]);
      break;

    case "WALLET_DISCONNECT":
      await wallet.disconnect();
      userMessage = {
        id: messages.length + 1,
        type: 'ai',
        content: `Wallet disconnected`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      history.push({ role: 'systemCommand', parts: userMessage.content })
      break;

    case "WALLET_CHECK":
      await wallet.connect();
      balance = await wallet.getBalance();
      address = await wallet.getAddress();
      userMessage = {
        id: messages.length + 1,
        type: 'ai',
        content: `
            🚀 **Wallet Details**:
            - **Address**: ${address}
            - **Balance**: ${balance}
          `,
        timestamp: new Date(),
      };
      history.push({ role: 'systemCommand', parts: userMessage.content })
      setMessages((prev) => [...prev, userMessage]);
      break;
    case "TX_CREATE":
      await gemini.sendMessage(`type:system {success:false , msg:"insufficient data complete data required ex {
            contract:"0x.."|| null // null for native transaction
            prams:[{
            address:"0x..."
            number:"1"
            }]
            transationType:native||contract
            }" , `)
            
      break;
      
    case "WALLET_BALANCE":
      await wallet.connect();
      balance = await wallet.getBalance();
      address = await wallet.getAddress();
      userMessage = {
        id: messages.length + 1,
        type: 'ai',
        content: `
              🚀 **Wallet Details**:
              - **Address**: ${address}
              - **Balance**: ${balance}
            `,
        timestamp: new Date(),
      };
      history.push({ role: 'systemCommand', parts: userMessage.content })
      setMessages((prev) => [...prev, userMessage]);
      break;

    case "WALLET_CREATE":
      const SmartWallet = ethers.Wallet.createRandom()
      userMessage = {
        id: messages.length + 1,
        type: 'ai',
        content: `Smart Wallet created :- 
          \n ${SmartWallet.address}\n 
          private key is :-
           \n ${SmartWallet.privateKey.toString()}`,
        timestamp: new Date(),
      };
      gemini.pushMsg({ role: 'user', parts: userMessage.content })
      setMessages(prev => [...prev, userMessage]);
      break;

    case "CURRENT_BLOCK_OF_NETWORK":

      userMessage = {
        id: messages.length + 1,
        type: 'ai',
        content: `Current network block is 2456134`,
        timestamp: new Date(),
      };
      history.push({ role: 'systemCommand', parts: userMessage.content })
      setMessages(prev => [...prev, userMessage]);
      break;

    case "MY_CONTRACTS":
      userMessage = {
        id: messages.length + 1,
        type: 'ai',
        content: `Currently contract api is not working`,
        timestamp: new Date(),
      };
      history.push({ role: 'systemCommand', parts: userMessage.content })
      setMessages(prev => [...prev, userMessage]);
      break;

    case "AUDIT_CONTRACT":
      userMessage = {
        id: messages.length + 1,
        type: 'ai',
        content: botMsg,
        timestamp: new Date(),
      };
      history.push({ role: 'systemCommand', parts: userMessage.content })
      setMessages(prev => [...prev, userMessage]);
      break;

    case "MY_WALLET_LIST":
      await wallet.connect();
      address = await wallet.getAddress();
      userMessage = {
        id: messages.length + 1,
        type: 'ai',
        content: `your wallets are:-\ [${address}]`,
        timestamp: new Date(),
      };
      history.push({ role: 'systemCommand', parts: userMessage.content })
      setMessages(prev => [...prev, userMessage]);
      break;

    default:
      if (command != "ERROR" && command != "normal_msg") {
        gemini.sendMessage(`type:system {success:false , msg:"invalid command" , data:{availableCommands:[
        {command:WALLET_CONNECT , msg:"to connect the wallet"},
        {command:WALLET_DISCONNECT , msg:"to disconnect the wallet"},
        {command:WALLET_CREATE , msg:"to create a wallet"},
        {command:WALLET_IMPORT , msg:"to import a wallet"},
        {command:WALLET_BACKUP , msg:"to backup a wallet"},
        {command:WALLET_RECOVER , msg:"to recover a wallet"},
        {command:WALLET_BALANCE , msg:"to check wallet balance"},
        {command:WALLET_BATCH , msg:"to execute batch transactions"},
        {command:CONTRACT_DEPLOY , msg:"to deploy a contract"},
        {command:CONTRACT_INTERACT , msg:"to interact with a contract"},
        {command:CONTRACT_VERIFY , msg:"to verify a contract"},
        {command:CONTRACT_UPGRADE , msg:"to upgrade a contract"},
        {command:TX_CREATE , msg:"to create a transaction"},
        {command:TX_SIGN , msg:"to sign a transaction"},
        {command:TX_STATUS , msg:"to check transaction status"},
        {command:TX_CANCEL , msg:"to cancel a transaction"},
        {command:SECURITY_CHECK , msg:"to perform a security check"},
        {command:CODE_VALIDATE , msg:"to validate contract code"},
        {command:SIGNATURE_CHECK , msg:"to check transaction signature"},
        {command:AUDIT_CONTRACT , msg:"to audit a contract"},
        {command:NETWORK_STATUS , msg:"to check network status"},
        {command:CHAIN_SWITCH , msg:"to switch network chain"},
        {command:RPC_MANAGE , msg:"to manage RPC settings"}
      ]}}`);
      }

      if (command == 'normal_msg' || command == 'ERROR') {
        userMessage = {
          id: messages.length + 1,
          type: 'ai',
          content: botMsg,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
      }

      break;
  }

  return userMessage;
};
