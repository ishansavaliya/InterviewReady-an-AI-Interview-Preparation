import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, BrainCircuit, Sparkles, MessageSquareText } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatOptions from "./ChatOptions";
import CareerRoadmap from "./CareerRoadmap";
import { Button } from "@/components/ui/button";
import {
  getCareerAdvice,
  getSkillsAdvice,
  getRoadmap,
} from "../utils/chatbot-service";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Hello! I'm your AI career counselor, here to help you navigate your tech career journey. What would you like to discuss today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [roadmapContent, setRoadmapContent] = useState<string | null>(null);
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll if roadmap is not being displayed
    if (!roadmapContent) {
      scrollToBottom();
    }
  }, [messages, roadmapContent]);

  const scrollToBottom = () => {
    // Don't scroll if roadmap is open
    if (!roadmapContent) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessageId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        text,
        isBot: false,
        timestamp: new Date(),
      },
    ]);

    // Set loading state
    setIsLoading(true);

    try {
      // Scroll to show loading indicator only if roadmap is not open
      if (!roadmapContent) {
        setTimeout(scrollToBottom, 100);
      }

      // Get response from AI
      const response = await getCareerAdvice(text);

      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: response,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, there was an error processing your request. Please try again.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoadmapSelect = async (role: string) => {
    // Add user message about requesting roadmap
    const userMessageId = Date.now().toString();
    const userMessage = `Can you provide a career roadmap for becoming a ${role}?`;

    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        text: userMessage,
        isBot: false,
        timestamp: new Date(),
      },
    ]);

    // Set loading state
    setIsLoading(true);

    // Scroll to show loading indicator only if roadmap is not open
    if (!roadmapContent) {
      setTimeout(scrollToBottom, 100);
    }

    try {
      // Get roadmap from AI
      const roadmap = await getRoadmap(role);

      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: `I've prepared a detailed career roadmap for becoming a ${role}. You can view it below or download it for future reference.`,
          isBot: true,
          timestamp: new Date(),
        },
      ]);

      // Show roadmap
      setRoadmapTitle(`${role} Career Roadmap`);
      setRoadmapContent(roadmap);
    } catch (error) {
      console.error("Error getting roadmap:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, there was an error generating the roadmap. Please try again.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillsSelect = async (category: string) => {
    // Add user message about requesting skills
    const userMessageId = Date.now().toString();
    const userMessage = `What ${category} skills should I focus on developing?`;

    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        text: userMessage,
        isBot: false,
        timestamp: new Date(),
      },
    ]);

    // Set loading state
    setIsLoading(true);

    // Scroll to show loading indicator only if roadmap is not open
    if (!roadmapContent) {
      setTimeout(scrollToBottom, 100);
    }

    try {
      // Get skills advice from AI
      const skills = await getSkillsAdvice(category);

      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: skills,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error getting skills advice:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, there was an error generating skills advice. Please try again.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const closeRoadmap = () => {
    setRoadmapContent(null);
  };

  const startNewChat = () => {
    setMessages([
      {
        id: "initial",
        text: "Hello! I'm your AI career counselor, here to help you navigate your tech career journey. What would you like to discuss today?",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
    setRoadmapContent(null);
    setRoadmapTitle("");
  };

  const handleCareerRoadmapClick = useCallback(
    async (role: string) => {
      // Add user message about requesting roadmap
      const userMessageId = Date.now().toString();
      const userMessage = `Can you provide a career roadmap for becoming a ${role}?`;

      setMessages((prev) => [
        ...prev,
        {
          id: userMessageId,
          text: userMessage,
          isBot: false,
          timestamp: new Date(),
        },
      ]);

      // Set loading state
      setIsLoading(true);

      // Scroll to show loading indicator only if roadmap is not open
      if (!roadmapContent) {
        setTimeout(scrollToBottom, 100);
      }

      try {
        // Get roadmap from AI
        const roadmap = await getRoadmap(role);

        // Add bot response
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: `I've prepared a detailed career roadmap for becoming a ${role}. You can view it below or download it for future reference.`,
            isBot: true,
            timestamp: new Date(),
          },
        ]);

        // Show roadmap
        setRoadmapTitle(`${role} Career Roadmap`);
        setRoadmapContent(roadmap);
      } catch (error) {
        console.error("Error getting roadmap:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Sorry, there was an error generating the roadmap. Please try again.",
            isBot: true,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [
      setMessages,
      setIsLoading,
      setRoadmapTitle,
      setRoadmapContent,
      scrollToBottom,
    ]
  );

  return (
    <div className="flex h-full flex-col rounded-lg border bg-white shadow-lg">
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 rounded-full bg-white shadow-md items-center justify-center overflow-hidden">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" fill="url(#paint0_linear)" />
              <path
                d="M20 10C22.2091 10 24 8.20914 24 6C24 3.79086 22.2091 2 20 2C17.7909 2 16 3.79086 16 6C16 8.20914 17.7909 10 20 10Z"
                fill="white"
              />
              <path
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                fill="white"
              />
              <path
                d="M8 26C10.2091 26 12 24.2091 12 22C12 19.7909 10.2091 18 8 18C5.79086 18 4 19.7909 4 22C4 24.2091 5.79086 26 8 26Z"
                fill="white"
              />
              <path
                d="M20 32C22.2091 32 24 30.2091 24 28C24 25.7909 22.2091 24 20 24C17.7909 24 16 25.7909 16 28C16 30.2091 17.7909 32 20 32Z"
                fill="white"
              />
              <path
                d="M32 26C34.2091 26 36 24.2091 36 22C36 19.7909 34.2091 18 32 18C29.7909 18 28 19.7909 28 22C28 24.2091 29.7909 26 32 26Z"
                fill="white"
              />
              <path
                d="M28 16C30.2091 16 32 14.2091 32 12C32 9.79086 30.2091 8 28 8C25.7909 8 24 9.79086 24 12C24 14.2091 25.7909 16 28 16Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9C27B0" />
                  <stop offset="1" stopColor="#6A1B9A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold flex items-center">
              CareerBot
              <span className="ml-2 text-xs bg-purple-500/30 rounded-full px-2 py-0.5 flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Powered
              </span>
            </h2>
            <p className="text-xs text-white/80 mt-0.5">
              by Interview<span className="font-bold">Ready</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-purple-600/10 border-purple-600/30 text-white hover:bg-purple-700/30 hover:text-white flex items-center gap-1.5"
            onClick={startNewChat}
          >
            <MessageSquareText className="h-4 w-4" />
            <span>New Chat</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex w-full gap-3 p-5 bg-background">
              <div className="flex-shrink-0">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-md">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex space-x-2 items-center">
                  <div className="h-2.5 w-2.5 bg-purple-600 rounded-full animate-bounce" />
                  <div className="h-2.5 w-2.5 bg-purple-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="h-2.5 w-2.5 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs text-muted-foreground ml-2">
                    Thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatOptions
        onRoadmapSelect={handleRoadmapSelect}
        onSkillsSelect={handleSkillsSelect}
      />

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />

      {roadmapContent && (
        <CareerRoadmap
          content={roadmapContent}
          title={roadmapTitle}
          onClose={closeRoadmap}
        />
      )}
    </div>
  );
};

export default ChatInterface;
