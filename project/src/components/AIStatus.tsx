import { Card } from "@/components/ui/card";

export function AIStatus() {
  return (
    <Card className="mt-6 p-4 bg-white/80 backdrop-blur border-none shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <p className="text-sm text-muted-foreground">
          Blockchain Assistant is active and ready for operations
        </p>
      </div>
    </Card>
  );
}