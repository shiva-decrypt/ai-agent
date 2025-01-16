import { ArrowUpRight, ArrowDownRight, Code, Settings2, History, Send, Bell, Lock, CreditCard, Shield, Key, Wallet, Users, ChevronRight } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transaction } from '@/types';
import { useState } from 'react';
import { TransactionDetails } from './TransactionDetails';
import { useToast } from "@/hooks/use-toast";

interface WalletTabProps {
  walletAddress: string | null;
  balance: string;
  transactions: Transaction[];
}

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SettingsSection = ({ title, description, icon, onClick }: SettingsSectionProps) => (
  <div
    className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-all"
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  </div>
);
export function WalletTab({ walletAddress, balance, transactions }: WalletTabProps) {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [activeView, setActiveView] = useState<'main' | 'send' | 'history' | 'settings' | 'security' | 'notifications' | 'recovery'>('main');
  const [sendAmount, setSendAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const { toast } = useToast();

  const handleSend = () => {
    toast({
      title: "Transaction Sent",
      description: `${sendAmount} ETH sent to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`,
    });
    setSendAmount('');
    setRecipientAddress('');
    setActiveView('main');
  };

  const handleBack = () => {
    setActiveView('main');
  };

  if (activeView === 'send') {
    return (
      <Card className="p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="mb-4">← Back</Button>
          <h2 className="text-2xl font-bold mb-2">Send Assets</h2>
          <p className="text-gray-500">Transfer assets to another address</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.0"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
              />
              <div className="absolute right-3 top-2.5 text-sm text-gray-500">ETH</div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Available: {balance} ETH</span>
              <button
                className="text-blue-500"
                onClick={() => setSendAmount(balance)}
              >
                Max
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Recipient Address</Label>
            <Input
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            disabled={!sendAmount || !recipientAddress}
            onClick={handleSend}
          >
            Send Transaction
          </Button>
        </div>
      </Card>
    );
  }

  if (activeView === 'history') {
    return (
      <Card className="p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="mb-4">← Back</Button>
          <h2 className="text-2xl font-bold mb-2">Transaction History</h2>
          <p className="text-gray-500">View all your past transactions</p>
        </div>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => setSelectedTx(tx)}
              className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'send' ? 'bg-red-100' :
                    tx.type === 'receive' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {tx.type === 'send' ? (
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    ) : tx.type === 'receive' ? (
                      <ArrowDownRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <Code className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {tx.type === 'contract' ? 'Contract Interaction' : `${tx.type === 'send' ? 'Sent' : 'Received'} ${tx.amount}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {tx.address.slice(0, 6)}...{tx.address.slice(-4)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">{tx.timestamp.toLocaleTimeString()}</p>
                  <p className={`text-sm ${
                    tx.status === 'success' ? 'text-green-600' :
                    tx.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {tx.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (activeView === 'settings') {
    return (
      <Card className="p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="mb-4">← Back</Button>
          <h2 className="text-2xl font-bold mb-2">Wallet Settings</h2>
          <p className="text-gray-500">Manage your wallet preferences and security</p>
        </div>

        <div className="space-y-2">
          <SettingsSection
            title="Security Settings"
            description="Manage security preferences and 2FA"
            icon={<Shield className="w-5 h-5 text-blue-600" />}
            onClick={() => setActiveView('security')}
          />
          <SettingsSection
            title="Notifications"
            description="Configure transaction and price alerts"
            icon={<Bell className="w-5 h-5 text-purple-600" />}
            onClick={() => setActiveView('notifications')}
          />
          <SettingsSection
            title="Recovery Setup"
            description="Configure wallet recovery options"
            icon={<Key className="w-5 h-5 text-green-600" />}
            onClick={() => setActiveView('recovery')}
          />
        </div>
      </Card>
    );
  }

  if (activeView === 'security') {
    return (
      <Card className="p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setActiveView('settings')} className="mb-4">← Back</Button>
          <h2 className="text-2xl font-bold mb-2">Security Settings</h2>
          <p className="text-gray-500">Manage your wallet security preferences</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500">Require 2FA for all transactions</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Transaction Signing</Label>
              <p className="text-sm text-gray-500">Require password for transactions</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Lock</Label>
              <p className="text-sm text-gray-500">Automatically lock wallet after inactivity</p>
            </div>
            <Switch />
          </div>

          <Button variant="destructive" className="w-full">
            Reset Security Settings
          </Button>
        </div>
      </Card>
    );
  }

  if (activeView === 'notifications') {
    return (
      <Card className="p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setActiveView('settings')} className="mb-4">← Back</Button>
          <h2 className="text-2xl font-bold mb-2">Notification Settings</h2>
          <p className="text-gray-500">Manage your notification preferences</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Transaction Alerts</Label>
              <p className="text-sm text-gray-500">Get notified about transactions</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Price Alerts</Label>
              <p className="text-sm text-gray-500">Get notified about price changes</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Security Alerts</Label>
              <p className="text-sm text-gray-500">Get notified about security events</p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label>Notification Email</Label>
            <Input type="email" placeholder="your@email.com" />
          </div>

          <Button className="w-full">
            Save Notification Settings
          </Button>
        </div>
      </Card>
    );
  }

  if (activeView === 'recovery') {
    return (
      <Card className="p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setActiveView('settings')} className="mb-4">← Back</Button>
          <h2 className="text-2xl font-bold mb-2">Recovery Setup</h2>
          <p className="text-gray-500">Configure wallet recovery options</p>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">Important</h3>
            <p className="text-sm text-yellow-700">
              Make sure to store your recovery information in a safe place. You'll need it to recover your wallet if you lose access.
            </p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Key className="w-4 h-4" />
              Generate Recovery Phrase
            </Button>

            <Button variant="outline" className="w-full flex items-center gap-2">
              <Users className="w-4 h-4" />
              Setup Social Recovery
            </Button>

            <Button variant="outline" className="w-full flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Connect Hardware Wallet
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Backup Email</Label>
            <Input type="email" placeholder="your@email.com" />
          </div>

          <Button className="w-full">
            Save Recovery Settings
          </Button>
        </div>
      </Card>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4">
        <h3 className="font-medium mb-2">Address</h3>
        <p className="text-sm font-mono break-all">
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Not connected'}
        </p>
      </Card>
      <Card className="p-4">
        <h3 className="font-medium mb-2">Balance</h3>
        <p className="text-2xl font-bold">{Number(balance).toFixed(4)} ETH</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-medium mb-2">Network</h3>
        <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
            <SelectItem value="polygon">Polygon</SelectItem>
            <SelectItem value="arbitrum">Arbitrum</SelectItem>
            <SelectItem value="optimism">Optimism</SelectItem>
          </SelectContent>
        </Select>
      </Card>
      <Card className="p-4 md:col-span-3 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 justify-center h-24"
            onClick={() => setActiveView('send')}
          >
            <Send className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Send</div>
              <div className="text-sm text-gray-500">Transfer assets</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 justify-center h-24"
            onClick={() => setActiveView('history')}
          >
            <History className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">History</div>
              <div className="text-sm text-gray-500">View transactions</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 justify-center h-24"
            onClick={() => setActiveView('settings')}
          >
            <Settings2 className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Settings</div>
              <div className="text-sm text-gray-500">Manage wallet</div>
            </div>
          </Button>
        </div>
        
        <Card className="p-4">
          <h3 className="font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {transactions.slice(0, 3).map((tx) => (
              <div 
                key={tx.id} 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={() => setSelectedTx(tx)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === 'send' ? 'bg-red-100' : 
                    tx.type === 'receive' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {tx.type === 'send' ? (
                      <ArrowUpRight className="w-4 h-4 text-red-600" />
                    ) : tx.type === 'receive' ? (
                      <ArrowDownRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <Code className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.type === 'contract' ? 'Contract Interaction' : `${tx.type === 'send' ? 'Sent' : 'Received'} ${tx.amount}`}</p>
                    <p className="text-sm text-muted-foreground">{tx.address.slice(0, 6)}...{tx.address.slice(-4)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">{tx.timestamp.toLocaleTimeString()}</p>
                  <p className={`text-sm ${
                    tx.status === 'success' ? 'text-green-600' :
                    tx.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>{tx.status}</p>
                </div>
              </div>
            ))}
            {transactions.length > 3 && (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setActiveView('history')}
              >
                View All Transactions
              </Button>
            )}
          </div>
        </Card>
        {selectedTx && (
          <TransactionDetails
            transaction={selectedTx}
            open={!!selectedTx}
            onClose={() => setSelectedTx(null)}
          />
        )}
      </Card>
    </div>
  );
}