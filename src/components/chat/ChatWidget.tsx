import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2, 
  RefreshCw, 
  Trash2,
  Sparkles,
  DollarSign,
  Phone,
  Briefcase,
  FileText
} from 'lucide-react';
import { getIntentStep, buildWhatsAppUrl, type LeadData } from '@/lib/chat/intent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  streaming?: boolean;
}

const QUICK_ACTIONS = [
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'pricing', label: 'Pricing / Get Quote', icon: DollarSign },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'cases', label: 'Case Studies', icon: FileText },
  { id: 'consultation', label: 'Book Free Consultation', icon: Sparkles },
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [isCapturingLead, setIsCapturingLead] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('HD Graphics_chat_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
      } catch (e) {
        console.error('Failed to load messages:', e);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('HD Graphics_chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const addMessage = (role: 'user' | 'assistant', content: string, streaming = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      streaming,
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  };

  const updateMessage = (id: string, content: string, streaming = false) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, content, streaming } : msg))
    );
  };

  const handleQuickAction = (actionId: string) => {
    const actions: Record<string, string> = {
      services: 'What services does HD Graphics offer?',
      pricing: 'I need a quote for my project',
      contact: 'How can I contact HD Graphics?',
      cases: 'Show me your case studies and portfolio',
      consultation: 'I want to book a free consultation',
    };

    const message = actions[actionId];
    if (message) {
      setInput(message);
      handleSend(message);
    }
  };

  const handleLeadCapture = async (intent: ReturnType<typeof getIntentStep>) => {
    if (!intent.needsLeadCapture || !intent.currentStep) return;

    setIsCapturingLead(true);
    const step = intent.currentStep;

    let prompt = '';
    switch (step) {
      case 'name':
        prompt = "Great! I'd love to help you get a quote. To get started, could you please share your name?";
        break;
      case 'services':
        prompt = "What services are you interested in? You can select multiple:\n• AI Marketing & Automation\n• Brand Strategy & Identity\n• Graphic Design & Content\n• Social Media Management\n• Website & App Development\n• CRM & Custom Software\n• SEO & Performance Marketing\n• AI Chatbots & Voice Assistants";
        break;
      case 'timeline':
        prompt = "What's your project timeline? (e.g., '2 weeks', '1 month', '3 months', 'ASAP')";
        break;
      case 'budget':
        prompt = "What's your budget range? (e.g., 'Under $5K', '$5K-$10K', '$10K-$25K', '$25K+', 'Let\'s discuss')";
        break;
      case 'contact':
        prompt = "How would you prefer we contact you? (WhatsApp or Email)";
        break;
      case 'complete':
        const whatsappUrl = buildWhatsAppUrl(leadData as LeadData);
        prompt = `Perfect! Here's your quote summary:\n\nName: ${leadData.name}\n${leadData.company ? `Company: ${leadData.company}\n` : ''}Services: ${leadData.services?.join(', ')}\nTimeline: ${leadData.timeline}\nBudget: ${leadData.budget}\nContact: ${leadData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}\n\nClick here to open WhatsApp with your quote request:\n${whatsappUrl}`;
        // Also add a clickable button message
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 1000);
        break;
    }

    addMessage('assistant', prompt);
    setIsCapturingLead(false);
  };

  const processUserResponse = (message: string) => {
    if (!isCapturingLead) return;

    const intent = getIntentStep(message, leadData);
    const step = intent.currentStep;

    if (step === 'name') {
      setLeadData(prev => ({ ...prev, name: message }));
    } else if (step === 'services') {
      const services = message.split(',').map(s => s.trim()).filter(Boolean);
      setLeadData(prev => ({ ...prev, services }));
    } else if (step === 'timeline') {
      setLeadData(prev => ({ ...prev, timeline: message }));
    } else if (step === 'budget') {
      setLeadData(prev => ({ ...prev, budget: message }));
    } else if (step === 'contact') {
      const method = message.toLowerCase().includes('whatsapp') ? 'whatsapp' : 'email';
      setLeadData(prev => ({ ...prev, contactMethod: method }));
    }

    // Check if we need to continue capture
    const nextIntent = getIntentStep('', leadData);
    if (nextIntent.needsLeadCapture) {
      handleLeadCapture(nextIntent);
    } else if (nextIntent.currentStep === 'complete') {
      handleLeadCapture(nextIntent);
      setLeadData({});
      setIsCapturingLead(false);
    }
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    setInput('');
    setError(null);
    addMessage('user', text);

    // Check for buying intent
    const intent = getIntentStep(text, leadData);
    if (intent.hasBuyingIntent && intent.needsLeadCapture) {
      setIsCapturingLead(true);
      processUserResponse(text);
      handleLeadCapture(intent);
      return;
    }

    // Process lead capture responses
    if (isCapturingLead) {
      processUserResponse(text);
      return;
    }

    // Regular chat
    setIsLoading(true);
    const messageId = addMessage('assistant', '', true);

    try {
      const conversationHistory = messages
        .filter(m => !m.streaming)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (!reader) throw new Error('No response body');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                // Server sends accumulated text, so replace instead of append
                fullContent = parsed.content;
                updateMessage(messageId, fullContent, true);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      updateMessage(messageId, fullContent, false);
    } catch (err: any) {
      setError(err.message || 'Failed to get response');
      updateMessage(messageId, `Sorry, I encountered an error: ${err.message}. Please try again.`, false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (messages.length < 2) return;
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      setMessages(prev => prev.filter(m => m.id !== lastUserMessage.id || m.role === 'assistant'));
      handleSend(lastUserMessage.content);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setLeadData({});
    setIsCapturingLead(false);
    localStorage.removeItem('HD Graphics_chat_messages');
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const renderMessageContent = (content: string) => {
    // Detect URLs and make them clickable
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline break-all"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#6B50A2] to-[#8B6BC2] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="close" className="w-6 h-6" />
          ) : (
            <MessageCircle key="open" className="w-6 h-6" />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-96 h-[600px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6B50A2] to-[#8B6BC2] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold">HD Graphics AI Assistant</h3>
                  <p className="text-xs text-white/80">Usually responds instantly</p>
                </div>
              </div>
              <button
                onClick={handleClear}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            {messages.length === 0 && (
              <div className="p-3 border-b border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map(action => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-[#6B50A2]" />
                    <p>Hi! I'm your HD Graphics AI Assistant.</p>
                    <p className="mt-1">How can I help you today?</p>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-[#6B50A2] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {renderMessageContent(message.content)}
                        {message.streaming && (
                          <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />
                        )}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && messages.length > 0 && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#6B50A2]" />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {error}
                    <button
                      onClick={handleRetry}
                      className="mt-2 flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Retry
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                  maxLength={2000}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-[#6B50A2] hover:bg-[#5a4088]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

