
"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCircuit, Mic, MicOff, Send, Sparkles, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpeechToText } from "@/hooks/use-speech-to-text";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getYoutubeRecommendationsAction, nirvanaChatAction } from "@/lib/actions";
import type { YoutubeRecommendation } from "@/ai/flows/youtube-recommendations-flow";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

export default function NirvanaPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [recommendations, setRecommendations] = useState<YoutubeRecommendation[]>([]);
  const [questionLevel, setQuestionLevel] = useState<'high' | 'medium' | 'low' | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { isListening, transcript, toggleListening, setTranscript } = useSpeechToText({ onTranscriptChange: setInput });

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() === "" || isAiTyping) return;

    if (isListening) {
      toggleListening();
    }
    
    const newUserMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    const currentInput = input;
    setInput("");
    setTranscript("");
    setIsAiTyping(true);

    try {
        const [recommendationResult, chatResult] = await Promise.all([
            getYoutubeRecommendationsAction({ question: currentInput }),
            nirvanaChatAction({ message: currentInput })
        ]);

        if (recommendationResult.success && recommendationResult.data) {
            setRecommendations(recommendationResult.data.recommendations);
            setQuestionLevel(recommendationResult.data.level);
        } else {
            console.error("Failed to get YouTube recommendations:", recommendationResult.error);
            setRecommendations([]);
            setQuestionLevel(null);
        }

        if (chatResult.success && chatResult.data) {
            const aiResponse: Message = {
                id: Date.now() + 1,
                text: chatResult.data.response,
                sender: "ai",
            };
            setMessages((prev) => [...prev, aiResponse]);
        } else {
             console.error("Failed to get chat response:", chatResult.error);
             const aiResponse: Message = {
                id: Date.now() + 1,
                text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
                sender: "ai",
            };
            setMessages((prev) => [...prev, aiResponse]);
        }
    } catch (error) {
        console.error(error);
        setRecommendations([]);
        setQuestionLevel(null);
         const aiResponse: Message = {
            id: Date.now() + 1,
            text: "I'm sorry, something went wrong. Please try again.",
            sender: "ai",
        };
        setMessages((prev) => [...prev, aiResponse]);
    } finally {
        setIsAiTyping(false);
    }
  };
  
  const getBadgeVariant = (level: typeof questionLevel) => {
    switch (level) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
      default:
        return 'default';
    }
  };


  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
       {(recommendations.length > 0 || questionLevel) && (
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                 <Youtube className="h-5 w-5 text-red-500" />
                 <CardTitle className="text-lg">Video Recommendations</CardTitle>
              </div>
              {questionLevel && (
                 <Badge variant={getBadgeVariant(questionLevel)} className="capitalize">
                   {questionLevel} Priority
                 </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map(rec => (
                   <a key={rec.videoId} href={`https://www.youtube.com/watch?v=${rec.videoId}`} target="_blank" rel="noopener noreferrer" className="block p-2 rounded-lg hover:bg-muted transition-colors">
                     <p className="font-semibold truncate">{rec.title}</p>
                     <p className="text-sm text-muted-foreground truncate">{rec.channel}</p>
                   </a>
                ))}
              </div>
            </CardContent>
         </Card>
       )}
      <div className="flex flex-grow gap-4">
        <div className="flex-grow flex flex-col">
            <ScrollArea className="flex-grow pr-4 -mr-4" ref={scrollAreaRef}>
                <div className="space-y-6">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <BrainCircuit className="h-16 w-16 mb-4" />
                    <h3 className="text-xl font-semibold">Welcome to Nirvana</h3>
                    <p>Your AI wellness guide is here to help. <br/> Ask for advice, reflect on your day, or explore mindfulness topics.</p>
                  </div>
                )}
                {messages.map((message) => (
                    <div
                    key={message.id}
                    className={cn(
                        "flex items-start gap-4",
                        message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                    >
                    {message.sender === "ai" && (
                        <Avatar className="border">
                          <AvatarFallback><BrainCircuit /></AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                        "max-w-xl rounded-lg p-3",
                        message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        )}
                    >
                        <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                    {message.sender === "user" && (
                        <Avatar className="border">
                          <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" data-ai-hint="person face" />
                          <AvatarFallback>RN</AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                {isAiTyping && (
                    <div className="flex items-start gap-4 justify-start">
                        <Avatar className="border">
                          <AvatarFallback><BrainCircuit /></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                            <span className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                        </div>
                    </div>
                )}
                </div>
            </ScrollArea>
             <div className="mt-4 border-t pt-4">
                <form onSubmit={handleSendMessage} className="relative">
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Type your message or use the mic..."}
                    className="pr-24 min-h-[60px]"
                    onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                    }
                    }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button type="button" size="icon" variant={isListening ? "destructive" : "ghost"} onClick={toggleListening}>
                        {isListening ? <MicOff /> : <Mic />}
                    </Button>
                    <Button type="submit" size="icon" disabled={input.trim() === "" || isAiTyping}>
                    <Send />
                    </Button>
                </div>
                </form>
            </div>
        </div>
        <div className="w-[300px] hidden lg:block rounded-lg overflow-hidden">
            <div id="elevenlabs-container" className="h-full">
                <elevenlabs-convai agent-id="agent_4601k53mbg0eebg82j06yprcshc8"></elevenlabs-convai>
            </div>
        </div>
      </div>
    </div>
  );
}

    