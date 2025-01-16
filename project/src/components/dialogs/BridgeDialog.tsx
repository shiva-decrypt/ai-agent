import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from 'react';
import { ActionDialog } from "./ActionDialog";
import { ArrowRightLeft, Wallet } from 'lucide-react';

const BRIDGE_PROVIDERS = [
  { 
    id: 'wormhole', 
    name: 'Wormhole', 
    fee: 0.1,
    time: '15 min',
    color: 'purple',
    routes: ['ethereum-polygon', 'ethereum-arbitrum', 'polygon-arbitrum']
  },
  { 
    id: 'hop', 
    name: 'Hop Protocol', 
    fee: 0.2,
    time: '10 min',
    color: 'green',
    routes: ['ethereum-polygon', 'ethereum-arbitrum']
  },
  { 
    id: 'across', 
    name: 'Across', 
    fee: 0.15,
    time: '12 min',
    color: 'blue',
    routes: ['ethereum-polygon', 'ethereum-arbitrum', 'polygon-arbitrum']
  }
];

const NETWORKS = [
  { 
    id: 'ethereum', 
    name: 'Ethereum', 
    tokens: ['ETH', 'USDC', 'USDT', 'WBTC'],
    balance: {
      ETH: '1.5',
      USDC: '5000',
      USDT: '2500',
      WBTC: '0.05'
    }
  },
  { 
    id: 'polygon', 
    name: 'Polygon', 
    tokens: ['MATIC', 'USDC', 'USDT', 'WETH'],
    balance: {
      MATIC: '1000',
      USDC: '2000',
      USDT: '1500',
      WETH: '0.5'
    }
  },
  { 
    id: 'arbitrum', 
    name: 'Arbitrum', 
    tokens: ['ETH', 'USDC', 'USDT', 'ARB'],
    balance: {
      ETH: '0.8',
      USDC: '3000',
      USDT: '1000',
      ARB: '500'
    }
  }
];

interface BridgeDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  onAction: () => void;
}

export function BridgeDialog({ open, onClose, loading, onAction }: BridgeDialogProps) {
  const [fromNetwork, setFromNetwork] = useState('ethereum');
  const [toNetwork, setToNetwork] = useState('polygon');
  const [asset, setAsset] = useState('ETH');
  const [bridgeProvider, setBridgeProvider] = useState('wormhole');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1);

  const fromNetworkData = NETWORKS.find(n => n.id === fromNetwork);
  const toNetworkData = NETWORKS.find(n => n.id === toNetwork);
  const selectedProvider = BRIDGE_PROVIDERS.find(p => p.id === bridgeProvider);
  const route = `${fromNetwork}-${toNetwork}`;

  const estimateFee = () => {
    if (!amount) return '0';
    const fee = selectedProvider?.fee || 0.1;
    return (parseFloat(amount) * (fee / 100)).toFixed(4);
  };

  const estimateTime = () => {
    return selectedProvider?.time || '15 min';
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onAction();
    }
  };

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      title="Bridge Assets"
    >
      <div className="space-y-4">
        <Tabs value={`step${step}`} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="step1" 
              className={step >= 1 ? "data-[state=active]:bg-primary" : "opacity-50"}
              onClick={() => step > 1 && setStep(1)}
            >
              1. Select Networks
            </TabsTrigger>
            <TabsTrigger 
              value="step2" 
              className={step >= 2 ? "data-[state=active]:bg-primary" : "opacity-50"}
              onClick={() => step > 2 && setStep(2)}
            >
              2. Choose Bridge
            </TabsTrigger>
            <TabsTrigger 
              value="step3" 
              className={step === 3 ? "data-[state=active]:bg-primary" : "opacity-50"}
            >
              3. Confirm
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label>From Network</Label>
              <Select 
                value={fromNetwork} 
                onValueChange={(value) => {
                  setFromNetwork(value);
                  if (value === toNetwork) {
                    setToNetwork(NETWORKS.find(n => n.id !== value)?.id || '');
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NETWORKS.map(network => (
                    <SelectItem key={network.id} value={network.id}>
                      {network.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>To Network</Label>
              <Select 
                value={toNetwork}
                onValueChange={(value) => {
                  setToNetwork(value);
                  if (value === fromNetwork) {
                    setFromNetwork(NETWORKS.find(n => n.id !== value)?.id || '');
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NETWORKS.filter(n => n.id !== fromNetwork).map(network => (
                    <SelectItem key={network.id} value={network.id}>
                      {network.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Asset</Label>
              <Select 
                value={asset}
                onValueChange={setAsset}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fromNetworkData?.tokens.map(token => (
                    <SelectItem key={token} value={token}>
                      {token}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fromNetworkData && (
                <p className="text-sm text-gray-500">
                  Balance: {fromNetworkData.balance[asset as keyof typeof fromNetworkData.balance]} {asset}
                </p>
              )}
            </div>

            <Input 
              type="number" 
              placeholder="Amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <Label>Bridge Provider</Label>
            <div className="grid grid-cols-1 gap-2">
              {BRIDGE_PROVIDERS.filter(p => p.routes.includes(route)).map(p => (
                <Card
                  key={p.id}
                  className={`p-3 cursor-pointer transition-colors ${
                    bridgeProvider === p.id ? `bg-${p.color}-50 border-${p.color}-200` : ''
                  }`}
                  onClick={() => setBridgeProvider(p.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{p.name}</span>
                      <p className="text-sm text-gray-500">Fee: {p.fee}% • Time: {p.time}</p>
                    </div>
                    <ArrowRightLeft className={`w-5 h-5 text-${p.color}-500`} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <Card className="p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Bridge Fee</span>
              <span>{estimateFee()} {asset}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Estimated Time</span>
              <span>{estimateTime()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">You Will Receive</span>
              <span>
                {amount ? (parseFloat(amount) - parseFloat(estimateFee())).toFixed(6) : '0'} {asset}
              </span>
            </div>
          </Card>
        )}

        <Button 
          className="w-full" 
          onClick={handleNext}
          disabled={loading || (step === 1 && (!amount || parseFloat(amount) <= 0)) || (step === 2 && !bridgeProvider)}
        >
          {loading ? 'Processing...' : step === 3 ? 'Confirm Bridge' : 'Continue'}
        </Button>
      </div>
    </ActionDialog>
  );
}