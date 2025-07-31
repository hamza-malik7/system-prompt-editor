import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LiveChat = ({ messages, onSendMessage, onClearChat, currentVersion }) => {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Live Chat {currentVersion ? `(${currentVersion})` : ""}
        </CardTitle>
        {onClearChat && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearChat}
            className="ml-auto"
          >
            Clear chat
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              {message.type === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs lg:max-w-md">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="space-y-2">
                    <div className="bg-blue-100 text-gray-800 px-4 py-2 rounded-lg max-w-xs lg:max-w-md whitespace-pre-wrap">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    {message.version && (
                      <div className="flex justify-start">
                        <Badge variant="secondary" className="text-xs">
                          {message.version}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a message"
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveChat;
