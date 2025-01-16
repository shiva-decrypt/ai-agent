import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActionDialog } from "./ActionDialog";

interface SecurityDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  onAction: () => void;
}

export function SecurityDialog({ open, onClose, loading, onAction }: SecurityDialogProps) {
  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      title="Security Check"
    >
      <div className="space-y-4">
        <Input placeholder="Contract Address or Transaction Hash" />
        <div className="p-4 bg-green-50 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">No vulnerabilities found</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Contract verified</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-700">Medium risk: Upgradeable contract</span>
          </div>
        </div>
        <Button className="w-full" onClick={onAction} disabled={loading}>
          {loading ? 'Scanning...' : 'Run Security Scan'}
        </Button>
      </div>
    </ActionDialog>
  );
}