import { Code } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Contract } from '@/types';
import { useState } from 'react';
import { ContractDetails } from './ContractDetails';

interface ContractsTabProps {
  contracts: Contract[];
}

export function ContractsTab({ contracts }: ContractsTabProps) {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {contracts.map((contract) => (
          <Card 
            key={contract.id} 
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => setSelectedContract(contract)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  contract.type === 'token' ? 'bg-purple-100' :
                  contract.type === 'nft' ? 'bg-pink-100' : 'bg-blue-100'
                }`}>
                  <Code className={`w-4 h-4 ${
                    contract.type === 'token' ? 'text-purple-600' :
                    contract.type === 'nft' ? 'text-pink-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium">{contract.name}</h4>
                  <p className="text-sm text-muted-foreground">{contract.type.toUpperCase()}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                contract.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {contract.status}
              </div>
            </div>
            <p className="text-sm font-mono mb-2">{contract.address}</p>
            <p className="text-xs text-muted-foreground">
              Deployed {contract.deployedAt.toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>
      {selectedContract && (
        <ContractDetails
          contract={selectedContract}
          open={!!selectedContract}
          onClose={() => setSelectedContract(null)}
        />
      )}
    </ScrollArea>
  );
}