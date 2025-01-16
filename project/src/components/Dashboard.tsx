import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { GeminiChat } from '@/lib/gemini';
import { WalletManager } from '@/lib/wallet';
import { formatEther } from 'ethers';
import { Message, Transaction, Contract } from '@/types';


import { Header } from './Header';
import { QuickActions } from './QuickActions';
import { ChatInterface } from './ChatInterface';
import { WalletTab } from './WalletTab';
import { ContractsTab } from './ContractsTab';
import { TransactionsTab } from './TransactionsTab';
import { AIStatus } from './AIStatus';

// Import dummy data from a separate file
import { dummyTransactions, dummyContracts } from '@/data/dummy';
import { useMessages } from './MessageComp';
import { HandleWalletOperation } from '@/lib/commandHandler';

export function Dashboard() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [messages, setMessages] = useMessages();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<GeminiChat | null>(null);
  const walletRef = useRef<WalletManager | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    chatRef.current = new GeminiChat();
    walletRef.current = new WalletManager();
  }, []);

  const handleConnect = async () => {
    try {
      if (!walletRef.current) return;

      if (connected) {
        await walletRef.current.disconnect();
        setConnected(false);
        setWalletAddress(null);
        setBalance('0');

        handleSend('Wallet disconnected');
        return;
      }

      const { address } = await walletRef.current.connect();
      const balance = await walletRef.current.getBalance();

      setConnected(true);
      setWalletAddress(address);
      setBalance(formatEther(balance));

      handleSend(`Wallet connected with address ${address}`);

      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const handleSend = async (message = input) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current?.sendMessage(message);
      if (!response) throw new Error('No response from AI');

      HandleWalletOperation({ command: response.command, messages: messages, setMessages: setMessages, botMsg: response.text })



    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: 'An error occurred',
        timestamp: new Date(),
        status: 'error',
        systemType: 'ERROR'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletOperation = async (response: { type: string; msg: string; data: Record<string, unknown> }) => {
    // ... (wallet operation logic remains the same)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header connected={connected} onConnect={handleConnect} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <QuickActions />

          <Card className="lg:col-span-2 p-6 bg-white/80 backdrop-blur border-none shadow-xl">
            <Tabs defaultValue="chat" className="space-y-4">
              <TabsList className="grid grid-cols-4 gap-4">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>

              <TabsContent value="chat">
                <ChatInterface
                  messages={messages}
                  input={input}
                  isLoading={isLoading}
                  chatRef={chatRef}
                  onInputChange={setInput}
                  onSend={() => handleSend()}
                />
              </TabsContent>

              <TabsContent value="wallet">
                <WalletTab
                  walletAddress={walletAddress}
                  balance={balance}
                  transactions={dummyTransactions}
                />
              </TabsContent>

              <TabsContent value="contracts">
                <ContractsTab contracts={dummyContracts} />
              </TabsContent>

              <TabsContent value="transactions">
                <TransactionsTab transactions={dummyTransactions} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <AIStatus />
      </div>
    </div>
  );
}