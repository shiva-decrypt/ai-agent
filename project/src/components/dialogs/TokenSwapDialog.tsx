import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useState } from 'react';
import { ActionDialog } from "./ActionDialog";
import { ArrowDownUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SWAP_PROVIDERS = [
  { 
    id: 'uniswap', 
    name: 'Uniswap', 
    fee: 0.3,
    time: '30 sec',
    color: 'pink',
    pairs: ['ETH-USDC', 'ETH-USDT', 'WBTC-ETH']
  },
  { 
    id: '1inch', 
    name: '1inch', 
    fee: 0.1,
    time: '45 sec',
    color: 'blue',
    pairs: ['ETH-USDC', 'ETH-USDT', 'WBTC-ETH']
  },
  { 
    id: 'curve', 
    name: 'Curve', 
    fee: 0.04,
    time: '35 sec',
    color: 'red',
    pairs: ['ETH-USDC', 'ETH-USDT']
  }
];

const TOKENS = {
  ETH: { balance: '1.5', price: 2500 },
  USDC: { balance: '5000', price: 1 },
  USDT: { balance: '2500', price: 1 },
  WBTC: { balance: '0.05', price: 45000 }
};

interface TokenSwapDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  onAction: () => void;
}

export function TokenSwapDialog({ open, onClose, loading, onAction }: TokenSwapDialogProps) {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState('');
  const [step, setStep] = useState(1);

  const estimateOutput = () => {
    if (!amount) return '0';
    const inputValue = parseFloat(amount) * TOKENS[fromToken as keyof typeof TOKENS].price;
    return (inputValue / TOKENS[toToken as keyof typeof TOKENS].price).toFixed(6);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onAction();
    }
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setAmount('');
  };

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      title="Token Swap"
    >
      <div className="space-y-4">
        <Tabs value={`step${step}`} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="step1" 
              className={step >= 1 ? "data-[state=active]:bg-primary" : "opacity-50"}
              onClick={() => step > 1 && setStep(1)}
            >
              1. Select Tokens
            </TabsTrigger>
            <TabsTrigger 
              value="step2" 
              className={step >= 2 ? "data-[state=active]:bg-primary" : "opacity-50"}
              onClick={() => step > 2 && setStep(2)}
            >
              2. Choose Provider
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
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TOKENS).map(token => (
                    <SelectItem key={token} value={token}>{token}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                Balance: {TOKENS[fromToken as keyof typeof TOKENS].balance} {fromToken}
              </p>
            </div>

            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSwapTokens}
              >
                <ArrowDownUp className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>To</Label>
              <Select 
                value={toToken}
                onValueChange={setToToken}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TOKENS)
                    .filter(t => t !== fromToken)
                    .map(token => (
                      <SelectItem key={token} value={token}>{token}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>≈ ${(parseFloat(amount || '0') * TOKENS[fromToken as keyof typeof TOKENS].price).toFixed(2)}</span>
                <button 
                  className="text-blue-500"
                  onClick={() => setAmount(TOKENS[fromToken as keyof typeof TOKENS].balance)}
                >
                  MAX
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <Label>Swap Provider</Label>
            <div className="grid grid-cols-1 gap-2">
              {SWAP_PROVIDERS.filter(p => p.pairs.includes(`${fromToken}-${toToken}`)).map(p => (
                <Card
                  key={p.id}
                  className={`p-3 cursor-pointer transition-colors ${
                    provider === p.id ? `bg-${p.color}-50 border-${p.color}-200` : ''
                  }`}
                  onClick={() => setProvider(p.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{p.name}</span>
                      <p className="text-sm text-gray-500">Fee: {p.fee}% • Time: {p.time}</p>
                    </div>
                    <ArrowDownUp className={`w-5 h-5 text-${p.color}-500`} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <Card className="p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">You Pay</span>
              <span>{amount} {fromToken}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">You Receive</span>
              <span>{estimateOutput()} {toToken}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Exchange Rate</span>
              <span>1 {fromToken} = {(TOKENS[fromToken as keyof typeof TOKENS].price / TOKENS[toToken as keyof typeof TOKENS].price).toFixed(6)} {toToken}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Provider Fee</span>
              <span>{(parseFloat(amount || '0') * (SWAP_PROVIDERS.find(p => p.id === provider)?.fee || 0) / 100).toFixed(6)} {fromToken}</span>
            </div>
          </Card>
        )}

        <Button 
          className="w-full" 
          onClick={handleNext}
          disabled={loading || (step === 1 && (!amount || parseFloat(amount) <= 0)) || (step === 2 && !provider)}
        >
          {loading ? 'Processing...' : step === 3 ? 'Confirm Swap' : 'Continue'}
        </Button>
      </div>
    </ActionDialog>
  );
}