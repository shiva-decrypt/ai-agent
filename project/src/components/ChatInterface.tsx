import { Send} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from '@/types';
import { useRef, useEffect } from 'react';
import { GeminiChat } from '@/lib/gemini';
import logo from '../assets/logo.png'
import userIcon from '../assets/user.png'

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  chatRef: React.RefObject<GeminiChat>;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInterface({
  messages,
  input,
  isLoading,
  chatRef,
  onInputChange,
  onSend
}: ChatInterfaceProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessageContent = (message: Message) => {
    return message.content;
  };

  return (
    <Card className="border-none shadow-sm">
      <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''
                }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                {message.type === 'user' ? (
                  <img src={userIcon} className="w-10 h-10 " />
                ) : (
                  <img src={logo} className="w-10 h-10 " />
                )}
              </div>
              <div className={`flex-1 rounded-lg p-3 ${message.type === 'user'
                  ? 'bg-blue-500 text-white ml-12'
                  : message.status === 'error'
                    ? 'bg-red-50 text-red-800 mr-12'
                    : 'bg-gray-100 mr-12'
                }`}>
                <p className="text-sm">{renderMessageContent(message)}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>AI is thinking...</span>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Ask about blockchain operations..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}