import { ArrowRightLeft, Shield, Network, Wallet, Coins, Sparkles, Blocks, Gauge, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { TokenSwapDialog } from './dialogs/TokenSwapDialog';
import { BridgeDialog } from './dialogs/BridgeDialog';
import { DeployDialog } from './dialogs/DeployDialog';
import { SecurityDialog } from './dialogs/SecurityDialog';
import { WalletsDialog } from './dialogs/WalletsDialog';
import { NetworkDialog } from './dialogs/NetworkDialog';
import { GasDialog } from './dialogs/GasDialog';
import { ChatbotDialog } from './dialogs/ChatbotDialog';

export function QuickActions() {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async (type: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setActiveDialog(null);
    
    switch (type) {
      case 'swap':
        toast({
          title: "Swap Successful",
          description: "Your tokens have been swapped successfully. Transaction will appear in your history shortly.",
        });
        break;
      case 'bridge':
        toast({
          title: "Bridge Transfer Initiated",
          description: "Assets are being bridged. This process may take 15-30 minutes to complete.",
        });
        break;
      case 'deploy':
        toast({
          title: "Contract Deployed",
          description: "Your smart contract has been deployed successfully. Contract verification in progress.",
        });
        break;
      default:
        toast({
          title: "Success",
          description: "Operation completed successfully",
        });
    }
  };

  return (
    <>
      <Card className="p-6 bg-white/80 backdrop-blur border-none shadow-xl">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          Quick Actions
        </h2>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => setActiveDialog('swap')}
          >
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Token Swap
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => setActiveDialog('bridge')}
          >
            <Coins className="w-4 h-4 mr-2" />
            Bridge Assets
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => setActiveDialog('deploy')}
          >
            <Blocks className="w-4 h-4 mr-2" />
            Deploy Contract
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => setActiveDialog('security')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Security Check
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => setActiveDialog('wallets')}
          >
            <Wallet className="w-4 h-4 mr-2" />
            Manage Wallets
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => setActiveDialog('network')}
          >
            <Network className="w-4 h-4 mr-2" />
            Network Status
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => setActiveDialog('chatbot')}
          >
            <Bot className="w-4 h-4 mr-2" />
            Create Chatbot
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => setActiveDialog('gas')}
          >
            <Gauge className="w-4 h-4 mr-2" />
            Gas Tracker
          </Button>
        </div>
      </Card>

      {/* Token Swap Dialog */}
      <TokenSwapDialog
        open={activeDialog === 'swap'}
        onClose={() => setActiveDialog(null)}
        loading={loading}
        onAction={() => handleAction('swap')}
      />

      {/* Bridge Assets Dialog */}
      <BridgeDialog
        open={activeDialog === 'bridge'}
        onClose={() => setActiveDialog(null)}
        loading={loading}
        onAction={() => handleAction('bridge')}
      />

      {/* Deploy Contract Dialog */}
      <DeployDialog
        open={activeDialog === 'deploy'}
        onClose={() => setActiveDialog(null)}
        loading={loading}
        onAction={() => handleAction('deploy')}
      />

      {/* Security Check Dialog */}
      <SecurityDialog
        open={activeDialog === 'security'}
        onClose={() => setActiveDialog(null)}
        loading={loading}
        onAction={() => handleAction('security')}
      />

      {/* Manage Wallets Dialog */}
      <WalletsDialog
        open={activeDialog === 'wallets'}
        onClose={() => setActiveDialog(null)}
        loading={loading}
        onAction={() => handleAction('wallets')}
      />

      {/* Network Status Dialog */}
      <NetworkDialog
        open={activeDialog === 'network'}
        onClose={() => setActiveDialog(null)}
        loading={loading}
        onAction={() => handleAction('network')}
      />

      {/* Gas Tracker Dialog */}
      <GasDialog
        open={activeDialog === 'gas'}
        onClose={() => setActiveDialog(null)}
        loading={loading}
        onAction={() => handleAction('gas')}
       />

      {/* Chatbot Dialog */}
      <ChatbotDialog
        open={activeDialog === 'chatbot'}
        onClose={() => setActiveDialog(null)}
        loading={loading}
        onAction={() => handleAction('chatbot')}
      />
    </>
  );
}