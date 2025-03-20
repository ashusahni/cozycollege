
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Image, PaperclipIcon, Smile } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'owner';
  timestamp: Date;
}

interface ChatDialogProps {
  propertyName: string;
  landlord: {
    name: string;
    photo: string;
    responseTime: string;
  };
}

const ChatDialog = ({ propertyName, landlord }: ChatDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm ${landlord.name}, the property manager for ${propertyName}. How can I help you today?`,
      sender: 'owner',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: newMessage.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate owner response after 1 second
      setTimeout(() => {
        const ownerResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getRandomResponse(),
          sender: 'owner',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, ownerResponse]);
      }, 1000);
    }
  };
  
  const getRandomResponse = () => {
    const responses = [
      `Thanks for your interest in ${propertyName}. Yes, we currently have vacancies.`,
      "The room comes fully furnished with a bed, desk, chair, and wardrobe.",
      "We offer monthly and semester-long contracts, with a 10% discount for paying upfront.",
      "Yes, all utilities including high-speed Wi-Fi are included in the rent.",
      "You're welcome to schedule a viewing any weekday between 10 AM and 6 PM.",
      "The security deposit is equal to one month's rent and is fully refundable.",
      "We're located just 5 minutes walking distance from the main campus entrance."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const formatMessageTime = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ', ' + 
             date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          <span>Chat with Owner</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <img src={landlord.photo} alt={landlord.name} className="object-cover" />
            </Avatar>
            <div>
              <DialogTitle>{landlord.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-1">
                <Badge variant="outline" className="rounded-full text-xs font-normal py-0">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  Online
                </Badge>
                <span className="text-xs">Responds in {landlord.responseTime}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={cn(
                  "flex",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div 
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.sender === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted rounded-tl-none"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">
                    {formatMessageTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full shrink-0">
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full shrink-0">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full shrink-0">
              <Smile className="h-4 w-4" />
            </Button>
            <div className="flex gap-2 flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
                placeholder="Type a message..."
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
