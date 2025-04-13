import React, { useState } from "react";
import {
  Send,
  HelpCircle,
  MessageSquarePlus,
  List,
  LayoutTemplate,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { careerPrompts, formattingPrompts } from "../utils/prompts";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState<"career" | "format">("career");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
    setShowSuggestions(false);
  };

  const handleFormatClick = (format: string) => {
    setMessage((prev) => {
      if (prev.trim() === "") return format;
      return `${prev}\n\n${format}`;
    });
  };

  return (
    <div className="border-t border-purple-100 bg-white p-4 shadow-lg">
      <div className="mx-auto max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {showSuggestions && (
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <HelpCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <p className="text-xs font-medium text-purple-700">
                    {activeTab === "career"
                      ? "Try asking about:"
                      : "Add formatting instructions:"}
                  </p>
                </div>
                <div className="flex rounded-md bg-white border border-purple-200 shadow-sm">
                  <button
                    type="button"
                    className={`px-3 py-1.5 text-xs rounded-l-md transition-colors ${
                      activeTab === "career"
                        ? "bg-purple-600 text-white"
                        : "bg-white text-purple-800 hover:bg-purple-100"
                    }`}
                    onClick={() => setActiveTab("career")}
                  >
                    <List className="h-3 w-3 inline-block mr-1" />
                    Questions
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1.5 text-xs rounded-r-md transition-colors ${
                      activeTab === "format"
                        ? "bg-purple-600 text-white"
                        : "bg-white text-purple-800 hover:bg-purple-100"
                    }`}
                    onClick={() => setActiveTab("format")}
                  >
                    <LayoutTemplate className="h-3 w-3 inline-block mr-1" />
                    Format
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeTab === "career"
                  ? careerPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        type="button"
                        className="rounded-full bg-white px-3 py-1.5 text-xs text-purple-800 hover:bg-purple-100 border border-purple-200 shadow-sm transition-colors"
                        onClick={() => handleSuggestionClick(prompt)}
                      >
                        {prompt}
                      </button>
                    ))
                  : formattingPrompts.map((format, index) => (
                      <button
                        key={index}
                        type="button"
                        className="rounded-full bg-white px-3 py-1.5 text-xs text-purple-800 hover:bg-purple-100 border border-purple-200 shadow-sm transition-colors"
                        onClick={() => handleFormatClick(format)}
                      >
                        {format}
                      </button>
                    ))}
              </div>
            </div>
          )}

          <div className="relative flex gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about career advice, skills, or roadmaps..."
              className="min-h-[56px] resize-none border-purple-200 focus-visible:ring-purple-500 shadow-sm pr-10"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute right-14 top-1/2 -translate-y-1/2">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full text-purple-400 hover:text-purple-600 hover:bg-purple-50"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                <MessageSquarePlus className="h-5 w-5" />
                <span className="sr-only">Show suggestions</span>
              </Button>
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={!message.trim() || isLoading}
              className="h-[56px] w-[56px] rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
