import { useState } from 'react';

type Message = {
  id: number;
  type: string;
  content: string;
  timestamp: Date;
  systemType?: string;
  systemData?: Record<string, unknown>;
};

function initializeMessages() {
  return [
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your blockchain assistant. How can I help you today?',
      timestamp: new Date(),
      systemType: 'SYSTEM_INIT',
      systemData: { status: 'ready' }
    }
  ];
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(initializeMessages());

  return [messages, setMessages] as const;
}