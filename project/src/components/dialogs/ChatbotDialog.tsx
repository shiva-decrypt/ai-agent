import { Bot, Palette, Code, Sparkles, MessageSquare, Upload, Brain, Zap, Globe, Shield, Settings, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef } from 'react';
import { GeminiChat } from '@/lib/gemini';
import { Message } from '@/types';
import { ActionDialog } from "./ActionDialog";

interface ProjectInfo {
  name: string;
  description: string;
  website?: string;
  github?: string;
  logo?: string;
}

interface ChatbotDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  onAction: () => void;
}

export function ChatbotDialog({ open, onClose, loading, onAction }: ChatbotDialogProps) {
  const [botName, setBotName] = useState('Shiva\'s Assistant');
  const [theme, setTheme] = useState('dark');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [enableAI, setEnableAI] = useState(true);
  const [enableCode, setEnableCode] = useState(true);
  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<GeminiChat | null>(null);

  // Initialize chat instance
  useState(() => {
    chatRef.current = new GeminiChat();
  });

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current?.sendMessage(input);
      if (!response) throw new Error('No response from AI');
      
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: response.text,
        timestamp: new Date(),
        status: 'success'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        status: 'error'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    name: 'Blockchain AI Assistant',
    description: 'An intelligent assistant for blockchain operations and smart contract interactions.',
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onAction();
    }
  };

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      title="Create Your AI Assistant"
    >
      <div className="space-y-6">
        <Tabs value={`step${step}`} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="step1"
              className={step >= 1 ? "data-[state=active]:bg-primary" : "opacity-50"}
              onClick={() => step > 1 && setStep(1)}
            >
              Project
            </TabsTrigger>
            <TabsTrigger
              value="step2"
              className={step >= 2 ? "data-[state=active]:bg-primary" : "opacity-50"}
              onClick={() => step > 2 && setStep(2)}
            >
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="step3"
              className={step >= 3 ? "data-[state=active]:bg-primary" : "opacity-50"}
              onClick={() => step > 3 && setStep(3)}
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="step4"
              className={step === 4 ? "data-[state=active]:bg-primary" : "opacity-50"}
            >
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="mb-4">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Project Logo"
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    Upload Logo
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  value={projectInfo.name}
                  onChange={(e) => setProjectInfo({ ...projectInfo, name: e.target.value })}
                  placeholder="Enter project name"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={projectInfo.description}
                  onChange={(e) => setProjectInfo({ ...projectInfo, description: e.target.value })}
                  placeholder="Brief description of your project"
                />
              </div>

              <div className="space-y-2">
                <Label>Website (Optional)</Label>
                <Input
                  value={projectInfo.website}
                  onChange={(e) => setProjectInfo({ ...projectInfo, website: e.target.value })}
                  placeholder="https://your-project.com"
                />
              </div>

              <div className="space-y-2">
                <Label>GitHub Repository (Optional)</Label>
                <Input
                  value={projectInfo.github}
                  onChange={(e) => setProjectInfo({ ...projectInfo, github: e.target.value })}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Bot Name</Label>
              <Input
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="Enter bot name"
              />
            </div>

            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 p-1 rounded-lg cursor-pointer"
                />
                <div className="flex-1 grid grid-cols-5 gap-2">
                  {[
                    '#3B82F6', // Blue
                    '#8B5CF6', // Purple
                    '#10B981', // Green
                    '#EC4899', // Pink
                    '#F97316', // Orange
                    '#EF4444', // Red
                    '#6366F1', // Indigo
                    '#14B8A6', // Teal
                    '#F59E0B', // Amber
                    '#6B7280'  // Gray
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => setPrimaryColor(color)}
                      className="w-full h-12 rounded-lg border-2 transition-all"
                      style={{
                        backgroundColor: color,
                        borderColor: primaryColor === color ? 'white' : color,
                        boxShadow: primaryColor === color ? '0 0 0 2px rgba(0,0,0,0.2)' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-medium mb-4">Core Features</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium">AI Capabilities</p>
                      <p className="text-sm text-gray-500">Advanced language processing</p>
                    </div>
                  </div>
                  <Switch checked={enableAI} onCheckedChange={setEnableAI} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Code Generation</p>
                      <p className="text-sm text-gray-500">Smart contract examples</p>
                    </div>
                  </div>
                  <Switch checked={enableCode} onCheckedChange={setEnableCode} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Multi-Chain Support</p>
                      <p className="text-sm text-gray-500">Support multiple networks</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium">Security Checks</p>
                      <p className="text-sm text-gray-500">Built-in security validation</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">Auto-Suggestions</p>
                      <p className="text-sm text-gray-500">Smart command suggestions</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Custom Commands</p>
                      <p className="text-sm text-gray-500">Define project-specific commands</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === 4 && (
          <Card className={`p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center`}
                  style={{ 
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#F3F4F6',
                  }}
                >
                  <Bot className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {botName}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    AI-Powered Blockchain Assistant
                  </p>
                </div>
              </div>
              <div className="ml-auto">
                <p className="text-xs text-gray-500">Powered by ArcAI</p>
              </div>
            </div>

            <div className="space-y-3 mb-3 max-h-[300px] overflow-y-auto">
              {messages.length === 0 ? (
                <div className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Hi! I'm {botName}. I can help you with blockchain operations and smart contracts! 🚀
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? `bg-${primaryColor} text-white`
                        : theme === 'dark'
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>Thinking...</span>
                </div>
              )}
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative"
            >
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`pr-10 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-200'
                }`}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: primaryColor }}
                disabled={!input.trim() || isLoading}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </form>
          </Card>
        )}

        <Button 
          className="w-full" 
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? 'Creating...' : step === 4 ? 'Create Assistant' : 'Continue'}
        </Button>
      </div>
    </ActionDialog>
  );
}