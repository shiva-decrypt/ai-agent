import { Check, History, AlertCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Transaction } from '@/types';

interface TransactionsTabProps {
  transactions: Transaction[];
}

export function TransactionsTab({ transactions }: TransactionsTabProps) {
  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {transactions.map((tx) => (
          <Card key={tx.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.status === 'success' ? 'bg-green-100' :
                  tx.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {tx.status === 'success' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : tx.status === 'pending' ? (
                    <History className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{tx.type === 'contract' ? 'Contract Interaction' : tx.type}</p>
                    <span className="text-sm text-muted-foreground">• {tx.amount}</span>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground">{tx.id}</p>
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
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}