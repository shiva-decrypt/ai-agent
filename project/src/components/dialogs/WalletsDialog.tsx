import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wallet, Shield, Users, Key, Send, History, Settings, ExternalLink, ArrowRight, CheckCircle, Clock, AlertCircle, Bell, Lock, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { ActionDialog } from "./ActionDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CREATED_WALLETS = [
  {
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    type: 'eoa',
    network: 'ethereum',
    balance: '1.5 ETH',
    transactions: 45,
    created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) // 30 days ago
  },
  {
    address: '0x123d35Cc6634C0532925a3b844Bc454e4438f123',
    type: 'smart',
    network: 'polygon',
    balance: '1000 MATIC',
    transactions: 120,
    created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15) // 15 days ago
  },
  {
    address: '0xDefi35Cc6634C0532925a3b844Bc454e4438fDef',
    type: 'multisig',
    network: 'arbitrum',
    balance: '0.8 ETH',
    transactions: 25,
    created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) // 5 days ago
  }
];

const WALLET_TYPES = {
  eoa: {
    name: 'EOA Wallet',
    description: 'Standard Externally Owned Account',
    icon: Wallet,
    features: ['Basic send/receive', 'Low gas fees', 'Simple setup'],
    cost: 'Free'
  },
  smart: {
    name: 'Smart Contract Wallet',
    description: 'Advanced features with built-in security',
    icon: Shield,
    features: ['Social recovery', 'Gas optimization', 'Batched transactions'],
    cost: '0.01 ETH'
  },
  multisig: {
    name: 'Multi-Signature Wallet',
    description: 'Requires multiple signatures for transactions',
    icon: Users,
    features: ['Multiple owners', 'Enhanced security', 'Configurable threshold'],
    cost: '0.02 ETH'
  }
};

const TRANSACTION_HISTORY = [
  {
    id: 'tx1',
    type: 'send',
    amount: '0.5 ETH',
    to: '0x742d...f44e',
    status: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    gas: '0.002 ETH'
  },
  {
    id: 'tx2',
    type: 'receive',
    amount: '1000 USDC',
    from: '0x123d...f123',
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: 'tx3',
    type: 'contract',
    amount: '0.1 ETH',
    to: '0xDefi...fDef',
    status: 'failed',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    error: 'Insufficient gas'
  }
];

interface WalletsDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  onAction: () => void;
}

export function WalletsDialog({ open, onClose, loading, onAction }: WalletsDialogProps) {
  const [walletType, setWalletType] = useState('eoa');
  const [network, setNetwork] = useState('ethereum');
  const [view, setView] = useState<'list' | 'create'>('list');
  const [owners, setOwners] = useState<string[]>(['']);
  const [threshold, setThreshold] = useState('2');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [sendAmount, setSendAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [activeTab, setActiveTab] = useState<'send' | 'history' | 'settings' | null>(null);

  const selectedType = WALLET_TYPES[walletType as keyof typeof WALLET_TYPES];
  const Icon = selectedType.icon;

  const handleCreateWallet = () => {
    onAction();
    setView('list');
  };

  const handleSend = async () => {
    onAction();
    setSelectedWallet(null);
    setSendAmount('');
    setRecipientAddress('');
  };

  const renderTransactionIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      title="Manage Wallets"
    >
      <div className="space-y-4">
        {view === 'list' ? (
          <>
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Your Wallets</h3>
              <Button variant="outline" onClick={() => setView('create')}>
                Create New Wallet
              </Button>
            </div>
            
            <div className="space-y-3">
              {CREATED_WALLETS.map((wallet) => (
                <Card key={wallet.address} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {wallet.type === 'eoa' ? (
                          <Wallet className="w-4 h-4 text-blue-500" />
                        ) : wallet.type === 'smart' ? (
                          <Shield className="w-4 h-4 text-purple-500" />
                        ) : (
                          <Users className="w-4 h-4 text-green-500" />
                        )}
                        <span className="font-medium">
                          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {wallet.network.charAt(0).toUpperCase() + wallet.network.slice(1)} • 
                        {wallet.type.toUpperCase()} • 
                        Created {wallet.created.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{wallet.balance}</p>
                      <p className="text-sm text-gray-500">{wallet.transactions} transactions</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedWallet(wallet.address);
                        setActiveTab('send');
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedWallet(wallet.address);
                        setActiveTab('history');
                      }}
                    >
                      <History className="w-4 h-4 mr-2" />
                      History
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedWallet(wallet.address);
                        setActiveTab('settings');
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href={`https://etherscan.io/address/${wallet.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {selectedWallet && (
              <>
                {activeTab === 'send' && (
                  <Card className="p-4 mt-4">
                    <h3 className="font-medium mb-4">Send Assets</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Amount</Label>
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={sendAmount}
                          onChange={(e) => setSendAmount(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Recipient Address</Label>
                        <Input
                          placeholder="0x..."
                          value={recipientAddress}
                          onChange={(e) => setRecipientAddress(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedWallet(null);
                            setActiveTab(null);
                          }}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSend}
                          disabled={!sendAmount || !recipientAddress}
                          className="flex-1"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {activeTab === 'history' && (
                  <Card className="p-4 mt-4">
                    <h3 className="font-medium mb-4">Transaction History</h3>
                    <div className="space-y-3">
                      {TRANSACTION_HISTORY.map((tx) => (
                        <div 
                          key={tx.id}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {renderTransactionIcon(tx.status)}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {tx.type === 'receive' ? 'Received' : tx.type === 'send' ? 'Sent' : 'Contract'}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {tx.type === 'receive' ? `from ${tx.from}` : `to ${tx.to}`}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {tx.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{tx.amount}</p>
                            {tx.gas && (
                              <p className="text-sm text-gray-500">Gas: {tx.gas}</p>
                            )}
                            {tx.error && (
                              <p className="text-sm text-red-500">{tx.error}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => {
                        setSelectedWallet(null);
                        setActiveTab(null);
                      }}
                    >
                      Close
                    </Button>
                  </Card>
                )}

                {activeTab === 'settings' && (
                  <Card className="p-4 mt-4">
                    <h3 className="font-medium mb-4">Wallet Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Bell className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">Notifications</p>
                            <p className="text-sm text-gray-500">Manage transaction alerts</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Lock className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">Security</p>
                            <p className="text-sm text-gray-500">Recovery and permissions</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">Payment Methods</p>
                            <p className="text-sm text-gray-500">Add or remove payment methods</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => {
                        setSelectedWallet(null);
                        setActiveTab(null);
                      }}
                    >
                      Close
                    </Button>
                  </Card>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={() => setView('list')}
            >
              ← Back to Wallets
            </Button>

        <div className="space-y-2">
          <Label>Wallet Type</Label>
          <Select value={walletType} onValueChange={setWalletType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(WALLET_TYPES).map(([key, { name }]) => (
                <SelectItem key={key} value={key}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">{selectedType.name}</h3>
              <p className="text-sm text-gray-500">{selectedType.description}</p>
            </div>
          </div>
          <div className="space-y-2">
            {selectedType.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-2">
          <Label>Network</Label>
          <Select value={network} onValueChange={setNetwork}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ethereum">Ethereum (Mainnet)</SelectItem>
              <SelectItem value="goerli">Goerli (Testnet)</SelectItem>
              <SelectItem value="sepolia">Sepolia (Testnet)</SelectItem>
              <SelectItem value="polygon">Polygon (Mainnet)</SelectItem>
              <SelectItem value="mumbai">Mumbai (Testnet)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {walletType === 'multisig' && (
          <>
            <div className="space-y-2">
              <Label>Owners</Label>
              {owners.map((owner, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Owner address"
                    value={owner}
                    onChange={(e) => {
                      const newOwners = [...owners];
                      newOwners[index] = e.target.value;
                      setOwners(newOwners);
                    }}
                  />
                  {index === owners.length - 1 ? (
                    <Button
                      variant="outline"
                      onClick={() => setOwners([...owners, ''])}
                    >
                      Add
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newOwners = owners.filter((_, i) => i !== index);
                        setOwners(newOwners);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Required Signatures</Label>
              <Select 
                value={threshold}
                onValueChange={setThreshold}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: owners.length }, (_, i) => i + 1).map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} of {owners.length}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <Card className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Deployment Cost</span>
            <span>{selectedType.cost}</span>
          </div>
        </Card>

        <Button 
          className="w-full" 
          onClick={handleCreateWallet} 
          disabled={loading || (walletType === 'multisig' && owners.some(o => !o))}
        >
          {loading ? 'Creating...' : 'Create New Wallet'}
        </Button>
        </>
        )}
      </div>
    </ActionDialog>
  );
}