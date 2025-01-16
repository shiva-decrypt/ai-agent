import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionDialog } from "./ActionDialog";

interface GasDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  onAction: () => void;
}

export function GasDialog({ open, onClose, loading, onAction }: GasDialogProps) {
  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      title="Gas Tracker"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">Slow</h3>
            <p className="text-lg font-bold text-green-600">12 Gwei</p>
            <p className="text-xs text-gray-500">~3 min</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">Normal</h3>
            <p className="text-lg font-bold text-orange-600">15 Gwei</p>
            <p className="text-xs text-gray-500">~1 min</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">Fast</h3>
            <p className="text-lg font-bold text-red-600">20 Gwei</p>
            <p className="text-xs text-gray-500">~30 sec</p>
          </Card>
        </div>
        <div className="space-y-2">
          <Label>Network</Label>
          <Select defaultValue="ethereum">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
              <SelectItem value="arbitrum">Arbitrum</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" onClick={onAction} disabled={loading}>
          {loading ? 'Updating...' : 'Update Gas Prices'}
        </Button>
      </div>
    </ActionDialog>
  );
}