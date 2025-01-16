import { ExternalLink, Copy, Code, PlayCircle, AlertCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Contract } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from 'react';

interface ContractDetailsProps {
  contract: Contract;
  open: boolean;
  onClose: () => void;
}

interface ContractFunction {
  name: string;
  type: 'read' | 'write';
  inputs: { name: string; type: string }[];
  outputs?: { type: string }[];
  stateMutability?: string;
}

const dummyContractFunctions: ContractFunction[] = [
  {
    name: 'balanceOf',
    type: 'read',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    name: 'transfer',
    type: 'write',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    name: 'allowance',
    type: 'read',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    name: 'approve',
    type: 'write',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    stateMutability: 'nonpayable'
  }
];

function FunctionCard({ func }: { func: ContractFunction }) {
  const [expanded, setExpanded] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate contract interaction
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (func.type === 'read') {
      // Simulate read result
      setResult(func.name === 'balanceOf' ? '1000000000000000000' : '500000000000000000');
    } else {
      // Simulate transaction hash
      setResult('0x1234...5678');
    }
    
    setLoading(false);
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-2">
          <PlayCircle className={`w-4 h-4 ${func.type === 'read' ? 'text-blue-500' : 'text-orange-500'}`} />
          <span className="font-medium">{func.name}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          func.type === 'read' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
        }`}>
          {func.type.toUpperCase()}
        </span>
      </div>

      {expanded && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {func.inputs.map((input, index) => (
            <div key={index}>
              <Label className="text-sm">
                {input.name} <span className="text-gray-500">({input.type})</span>
              </Label>
              <Input
                placeholder={`Enter ${input.name}`}
                value={inputValues[input.name] || ''}
                onChange={(e) => setInputValues(prev => ({
                  ...prev,
                  [input.name]: e.target.value
                }))}
                className="mt-1"
              />
            </div>
          ))}
          
          <Button 
            type="submit" 
            disabled={loading}
            variant={func.type === 'read' ? 'default' : 'destructive'}
            className="w-full"
          >
            {loading ? 'Processing...' : func.type === 'read' ? 'Query' : 'Write'}
          </Button>

          {result && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              func.type === 'read' ? 'bg-blue-50' : 'bg-orange-50'
            }`}>
              <div className="font-medium mb-1">Result:</div>
              <div className="font-mono break-all">
                {func.type === 'read' 
                  ? `${BigInt(result).toString()} (${Number(result) / 1e18} tokens)`
                  : `Transaction Hash: ${result}`
                }
              </div>
            </div>
          )}
        </form>
      )}
    </Card>
  );
}

export function ContractDetails({ contract, open, onClose }: ContractDetailsProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Contract Details: {contract.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="read">Read Contract</TabsTrigger>
            <TabsTrigger value="write">Write Contract</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <span className="text-sm text-gray-500">Contract Address:</span>
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-sm font-mono">{contract.address}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(contract.address)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      asChild
                    >
                      <a href={`https://etherscan.io/address/${contract.address}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <span className="text-sm text-gray-500">Network:</span>
                  <span className="col-span-2 text-sm">{contract.network}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <span className="text-sm text-gray-500">Type:</span>
                  <span className="col-span-2 text-sm">{contract.type.toUpperCase()}</span>
                </div>

                {contract.symbol && (
                  <div className="grid grid-cols-3 gap-4 py-2 border-b">
                    <span className="text-sm text-gray-500">Symbol:</span>
                    <span className="col-span-2 text-sm">{contract.symbol}</span>
                  </div>
                )}

                {contract.totalSupply && (
                  <div className="grid grid-cols-3 gap-4 py-2 border-b">
                    <span className="text-sm text-gray-500">Total Supply:</span>
                    <span className="col-span-2 text-sm">{contract.totalSupply}</span>
                  </div>
                )}

                {contract.decimals !== undefined && (
                  <div className="grid grid-cols-3 gap-4 py-2 border-b">
                    <span className="text-sm text-gray-500">Decimals:</span>
                    <span className="col-span-2 text-sm">{contract.decimals}</span>
                  </div>
                )}

                {contract.holders !== undefined && (
                  <div className="grid grid-cols-3 gap-4 py-2 border-b">
                    <span className="text-sm text-gray-500">Holders:</span>
                    <span className="col-span-2 text-sm">{contract.holders.toLocaleString()}</span>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <span className="text-sm text-gray-500">Deployed:</span>
                  <span className="col-span-2 text-sm">{contract.deployedAt.toLocaleString()}</span>
                </div>

                {contract.compiler && (
                  <div className="grid grid-cols-3 gap-4 py-2 border-b">
                    <span className="text-sm text-gray-500">Compiler:</span>
                    <span className="col-span-2 text-sm">{contract.compiler}</span>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Contract Source Code</h3>
                  <Button variant="outline" size="sm">
                    <Code className="w-4 h-4 mr-2" />
                    Verify & Publish
                  </Button>
                </div>
                <ScrollArea className="h-[400px] w-full rounded-md border">
                  {contract.abi ? (
                    <pre className="p-4 text-xs">{JSON.stringify(JSON.parse(contract.abi), null, 2)}</pre>
                  ) : (
                    <div className="p-4 text-sm text-gray-500">
                      Contract source code not verified
                    </div>
                  )}
                </ScrollArea>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="read">
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-medium">Read Contract</h3>
                  {!contract.abi && (
                    <div className="flex items-center gap-2 text-sm text-yellow-600">
                      <AlertCircle className="w-4 h-4" />
                      Contract not verified
                    </div>
                  )}
                </div>
                <ScrollArea className="h-[500px] pr-4">
                  {dummyContractFunctions
                    .filter(f => f.type === 'read')
                    .map((func, index) => (
                      <FunctionCard key={index} func={func} />
                    ))
                  }
                </ScrollArea>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="write">
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-medium">Write Contract</h3>
                  {!contract.abi && (
                    <div className="flex items-center gap-2 text-sm text-yellow-600">
                      <AlertCircle className="w-4 h-4" />
                      Contract not verified
                    </div>
                  )}
                </div>
                <ScrollArea className="h-[500px] pr-4">
                  {dummyContractFunctions
                    .filter(f => f.type === 'write')
                    .map((func, index) => (
                      <FunctionCard key={index} func={func} />
                    ))
                  }
                </ScrollArea>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}