import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ActionDialog } from "./ActionDialog";

interface NetworkDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  onAction: () => void;
}

export function NetworkDialog({ open, onClose, loading, onAction }: NetworkDialogProps) {
  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      title="Network Status"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-medium">Ethereum</span>
            </div>
            <p className="text-sm text-gray-500">Block: 18934567</p>
            <p className="text-sm text-gray-500">TPS: 15.4</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-medium">Polygon</span>
            </div>
            <p className="text-sm text-gray-500">Block: 51234567</p>
            <p className="text-sm text-gray-500">TPS: 65.2</p>
          </Card>
        </div>
        <Button className="w-full" onClick={onAction} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Status'}
        </Button>
      </div>
    </ActionDialog>
  );
}