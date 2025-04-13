import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: Date;
}

// Clean the message to remove any template prompts or formatting instructions
const cleanMessage = (message: string): string => {
  // If the message contains 'Format your response' instruction text, remove it and everything before it
  if (message.includes("Format your response")) {
    const parts = message.split("---");
    // Return only from the first proper content section
    if (parts.length > 1) {
      return parts.slice(1).join("---");
    }
  }

  // Remove any placeholder instructions that might be in the final output
  return message
    .replace(/Format your response .*?specifications:/gs, "")
    .replace(/Adhere strictly to these formatting requirements:.*$/gs, "")
    .trim();
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isBot,
  timestamp = new Date(),
}) => {
  // Clean bot messages to remove template instructions
  const displayMessage = isBot ? cleanMessage(message) : message;

  return (
    <div
      className={cn(
        "flex w-full gap-4 p-5 border-b",
        isBot ? "bg-background" : "bg-muted/30"
      )}
    >
      <div className="flex-shrink-0">
        {isBot ? (
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-md">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
        ) : (
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
            <User className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isBot ? "CareerBot" : "You"}
          </span>
          <span className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div
          className={cn(
            "prose prose-sm max-w-none",
            isBot ? "font-serif" : "",
            "prose-headings:text-purple-800 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base",
            "prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3",
            "prose-ul:pl-5 prose-ol:pl-5 prose-ul:my-3 prose-ol:my-3",
            "prose-li:mb-2 prose-li:pb-0",
            "prose-li:marker:text-purple-700",
            "prose-strong:font-bold prose-strong:text-purple-900",
            "prose-p:my-3 prose-a:text-blue-700 prose-a:hover:underline",
            "[&>*:first-child]:mt-0",
            "prose-li:mt-0",
            "[&>ul>li]:mb-2 [&>ol>li]:mb-2",
            "[&>ul]:space-y-2 [&>ol]:space-y-3",
            "prose-li:block",
            "[&_ol]:list-decimal [&_ul]:list-disc",
            isBot ? "text-[15px] leading-relaxed tracking-normal" : "",
            // Enhanced styling for numbered lists
            "[&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:mt-3",
            "[&_ol>li]:marker:text-purple-700 [&_ol>li]:marker:font-semibold",
            // Improved indentation for lists
            "[&_ul>li>ul]:ml-4 [&_ol>li>ul]:ml-4",
            "[&_ul>li>ul>li]:text-[14px]",
            // Consistent spacing for all list items
            "[&_ul>li]:pl-0 [&_ol>li]:pl-0",
            // Remove italic styling
            "prose-em:not-italic"
          )}
        >
          {isBot ? (
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    {...props}
                    className="text-xl font-bold text-purple-900 pb-2 pt-4 mb-4"
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    {...props}
                    className="text-lg font-bold text-purple-800 pb-2 pt-4 mb-4"
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    {...props}
                    className="text-md font-bold text-purple-700 pb-1 pt-3 mb-3"
                  />
                ),
                li: ({ node, ...props }) => (
                  <li {...props} className="mb-2 py-0 block w-full" />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    {...props}
                    className="my-3 space-y-2 pl-5 list-disc marker:text-purple-700"
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    {...props}
                    className="my-3 space-y-3 pl-5 list-decimal marker:text-purple-700 marker:font-semibold"
                  />
                ),
                p: ({ node, ...props }) => <p {...props} className="my-3" />,
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    {...props}
                    className="border-l-4 border-purple-300 pl-4 my-4"
                  />
                ),
                hr: ({ node, ...props }) => (
                  <hr {...props} className="my-5 border-purple-200" />
                ),
                em: ({ node, ...props }) => (
                  <span {...props} className="font-normal" />
                ),
                strong: ({ node, ...props }) => (
                  <strong {...props} className="font-bold text-purple-900" />
                ),
              }}
            >
              {displayMessage}
            </ReactMarkdown>
          ) : (
            <p className="text-sm">{displayMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
