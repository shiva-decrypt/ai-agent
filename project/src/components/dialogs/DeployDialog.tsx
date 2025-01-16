import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActionDialog } from "./ActionDialog";

const CONTRACT_TEMPLATES = {
  token: {
    name: 'ERC20 Token',
    description: 'Standard ERC20 token with basic functionality',
    fields: ['name', 'symbol', 'initialSupply', 'decimals'],
    cost: '0.05 ETH'
  },
  nft: {
    name: 'ERC721 NFT Collection',
    description: 'NFT collection with minting and metadata support',
    fields: ['name', 'symbol', 'baseURI', 'maxSupply'],
    cost: '0.08 ETH'
  },
  custom: {
    name: 'Custom Contract',
    description: 'Deploy your own smart contract',
    fields: ['code'],
    cost: '0.1 ETH'
  }
};

interface DeployDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  onAction: () => void;
}

export function DeployDialog({ open, onClose, loading, onAction }: DeployDialogProps) {
  const [contractType, setContractType] = useState('token');
  const [network, setNetwork] = useState('ethereum');
  const [values, setValues] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const template = CONTRACT_TEMPLATES[contractType as keyof typeof CONTRACT_TEMPLATES];
  const isValid = template.fields.every(field => values[field]);

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
      title="Deploy Contract"
    >
      <div className="space-y-4">
        <Tabs value={`step${step}`} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="step1" 
              className={step >= 1 ? "data-[state=active]:bg-primary" : "opacity-50"}
              onClick={() => step > 1 && setStep(1)}
            >
              1. Contract Type
            </TabsTrigger>
            <TabsTrigger 
              value="step2" 
              className={step >= 2 ? "data-[state=active]:bg-primary" : "opacity-50"}
              onClick={() => step > 2 && setStep(2)}
            >
              2. Configuration
            </TabsTrigger>
            <TabsTrigger 
              value="step3" 
              className={step === 3 ? "data-[state=active]:bg-primary" : "opacity-50"}
            >
              3. Review
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {step === 1 && <div className="space-y-2">
          <Label>Contract Type</Label>
          <Select value={contractType} onValueChange={setContractType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CONTRACT_TEMPLATES).map(([key, { name }]) => (
                <SelectItem key={key} value={key}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">{template.description}</p>
        </div>}

        {step === 2 && <div className="space-y-2">
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
        </div>}

        {step === 2 && template.fields.map(field => (
          <div key={field} className="space-y-2">
            <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            {field === 'code' ? (
              <Textarea
                placeholder="Paste your contract code here..."
                value={values[field] || ''}
                onChange={(e) => setValues(prev => ({ ...prev, [field]: e.target.value }))}
                className="font-mono"
                rows={10}
              />
            ) : (
              <Input
                placeholder={`Enter ${field}`}
                value={values[field] || ''}
                onChange={(e) => setValues(prev => ({ ...prev, [field]: e.target.value }))}
              />
            )}
          </div>
        ))}

        {step === 3 && <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Deployment Cost</span>
            <span>{template.cost}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Gas Estimate</span>
            <span>~1,500,000 gas</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm">Contract verified automatically</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm">Source code published to Etherscan</span>
            </div>
            {network === 'ethereum' && (
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-600">High gas fees on Ethereum</span>
              </div>
            )}
          </div>
        </Card>}

        <Button 
          className="w-full" 
          onClick={handleNext}
          disabled={loading || (step === 1 && !contractType) || (step === 2 && !isValid)}
        >
          {loading ? 'Deploying...' : step === 3 ? 'Deploy Contract' : 'Continue'}
        </Button>
      </div>
    </ActionDialog>
  );
}