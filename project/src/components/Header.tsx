import { Brain, Wallet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import logo from '../assets/logo.png'
interface HeaderProps {
  connected: boolean;
  onConnect: () => void;
}

export function Header({ connected, onConnect }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <img src={logo} className="w-12 h-12 text-blue-600" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          AI Blockchain Agent
        </h1>
      </div>
      <Button 
        variant={connected ? "outline" : "default"}
        onClick={onConnect}
        className="flex items-center gap-2"
      >
        <Wallet className="w-4 h-4" />
        {connected ? "Connected" : "Connect Wallet"}
      </Button>
    </header>
  );
}