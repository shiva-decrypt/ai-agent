import { ExternalLink, Copy, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Transaction } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TransactionDetailsProps {
  transaction: Transaction;
  open: boolean;
  onClose: () => void;
}

export function TransactionDetails({ transaction, open, onClose }: TransactionDetailsProps) {
  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="font-medium">Transaction Status</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                transaction.status === 'success' ? 'bg-green-100 text-green-700' :
                transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <span className="text-sm text-gray-500">Transaction Hash:</span>
                <div className="col-span-2 flex items-center gap-2">
                  <span className="text-sm font-mono">{transaction.id}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(transaction.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6"
                    asChild
                  >
                    <a href={`https://etherscan.io/tx/${transaction.id}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <span className="text-sm text-gray-500">Network:</span>
                <span className="col-span-2 text-sm">{transaction.network}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <span className="text-sm text-gray-500">Block:</span>
                <span className="col-span-2 text-sm">{transaction.blockNumber || 'Pending'}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <span className="text-sm text-gray-500">From:</span>
                <div className="col-span-2 flex items-center gap-2">
                  <span className="text-sm font-mono">{transaction.address}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(transaction.address)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <span className="text-sm text-gray-500">Value:</span>
                <span className="col-span-2 text-sm">{transaction.amount}</span>
              </div>

              {transaction.gasUsed && (
                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <span className="text-sm text-gray-500">Gas Used:</span>
                  <span className="col-span-2 text-sm">{transaction.gasUsed}</span>
                </div>
              )}

              {transaction.gasPrice && (
                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <span className="text-sm text-gray-500">Gas Price:</span>
                  <span className="col-span-2 text-sm">{transaction.gasPrice}</span>
                </div>
              )}

              {transaction.nonce !== undefined && (
                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <span className="text-sm text-gray-500">Nonce:</span>
                  <span className="col-span-2 text-sm">{transaction.nonce}</span>
                </div>
              )}

              {transaction.input && (
                <div className="grid grid-cols-3 gap-4 py-2 border-b">
                  <span className="text-sm text-gray-500">Input Data:</span>
                  <div className="col-span-2">
                    <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                      {transaction.input}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}