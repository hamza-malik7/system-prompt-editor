import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";
import Modal from "./Modal";

const LiveChat = ({
  messages,
  onSendMessage,
  onClearChat,
  models = [],
  currentModel,
  onModelChange,
  currentVersion,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const [evalModal, setEvalModal] = useState(null);
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
    <>
      <Card className="h-full flex flex-col overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Live Chat {currentVersion ? `(${currentVersion})` : ""}
          </CardTitle>
          <div className="flex items-center gap-2 ml-auto">
            {models.length > 0 && (
              <Select value={currentModel} onValueChange={onModelChange}>
                <SelectTrigger className="w-[9rem] h-8 text-xs">
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m} value={m} className="text-xs">
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {onClearChat && (
              <Button variant="outline" size="sm" onClick={onClearChat}>
                Clear chat
              </Button>
            )}
          </div>
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
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {message.version}
                          </Badge>
                          {message.evaluation && (
                            <Badge
                              variant={
                                message.evaluation.status === "accepted"
                                  ? "secondary"
                                  : "destructive"
                              }
                              className="text-xs cursor-pointer"
                              onClick={() => setEvalModal(message.id)}
                            >
                              {message.evaluation.status}
                            </Badge>
                          )}
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

      <Modal open={evalModal !== null} onClose={() => setEvalModal(null)}>
        {evalModal !== null && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Evaluation History</h3>
            {messages.find((m) => m.id === evalModal)?.evaluation && (
              <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-2 rounded-md">
                {JSON.stringify(
                  messages.find((m) => m.id === evalModal).evaluation,
                  null,
                  2
                )}
              </pre>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default LiveChat;
