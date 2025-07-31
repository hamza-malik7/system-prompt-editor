import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { defaultPrompts, AVAILABLE_MODELS } from "./constants/defaults";
import SystemPrompt from "./components/SystemPrompt";
import LiveChat from "./components/LiveChat";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  const [prompts, setPrompts] = useState(() => {
    try {
      const stored = localStorage.getItem("systemPrompts");
      return stored ? JSON.parse(stored) : defaultPrompts;
    } catch {
      return defaultPrompts;
    }
  });

  const [currentPromptId, setCurrentPromptId] = useState(() => {
    try {
      const storedId = localStorage.getItem("currentPromptId");
      return storedId
        ? JSON.parse(storedId)
        : defaultPrompts[defaultPrompts.length - 1].id;
    } catch {
      return defaultPrompts[defaultPrompts.length - 1].id;
    }
  });

  const [currentPromptContent, setCurrentPromptContent] = useState(() => {
    const selected =
      (prompts || []).find((p) => p.id === currentPromptId) || prompts[0];
    return selected.content;
  });

  const [isSaving, setIsSaving] = useState(false);

  const [currentModel, setCurrentModel] = useState("gpt-4o-mini");

  useEffect(() => {
    localStorage.setItem("systemPrompts", JSON.stringify(prompts));
  }, [prompts]);

  useEffect(() => {
    localStorage.setItem("currentPromptId", JSON.stringify(currentPromptId));
  }, [currentPromptId]);

  const handlePromptSave = async () => {
    setIsSaving(true);
    const newVersion = `v${prompts.length + 1}`;

    let title = "Untitled";
    try {
      const { generateTitle } = await import("./services/openai");
      title = await generateTitle(currentPromptContent);
    } catch (e) {
      console.error("Title generation failed", e);
    }

    const newPrompt = {
      id: prompts.length + 1,
      version: newVersion,
      content: currentPromptContent,
      title,
    };
    setPrompts([...prompts, newPrompt]);
    setCurrentPromptId(newPrompt.id);
    setIsSaving(false);
  };

  const handlePromptRun = () => {
    const updatedPrompts = prompts.map((p) =>
      p.id === currentPromptId ? { ...p, content: currentPromptContent } : p
    );
    setPrompts(updatedPrompts);

    toast.success("Prompt applied", { icon: "✅" });
  };

  const handleResetPrompts = () => {
    localStorage.removeItem("systemPrompts");
    localStorage.removeItem("currentPromptId");
    setPrompts(defaultPrompts);
    const lastDefault = defaultPrompts[defaultPrompts.length - 1];
    setCurrentPromptId(lastDefault.id);
    setCurrentPromptContent(lastDefault.content);
  };

  const handleVersionChange = (promptId) => {
    const selectedPrompt = prompts.find((p) => p.id === promptId);
    setCurrentPromptId(promptId);
    setCurrentPromptContent(selectedPrompt.content);
  };

  const handleSendMessage = async (message) => {
    const userId = Date.now();
    const userMessage = {
      id: userId,
      type: "user",
      content: message,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const currentPrompt = prompts.find((p) => p.id === currentPromptId);
    const typingId = userId + 1;
    const typingMessage = {
      id: typingId,
      type: "assistant",
      content: "*typing...*",
      version: currentPrompt.version,
      isTyping: true,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, typingMessage]);

    const recentHistory = [...messages, userMessage].slice(-10);

    try {
      const { sendChatMessage } = await import("./services/openai");
      const aiResponse = await sendChatMessage(
        currentPrompt.content,
        message,
        recentHistory,
        currentModel
      );

      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId ? { ...m, content: aiResponse, isTyping: false } : m
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);

      const errorResponse =
        "I apologize, but I encountered an error while processing your message. Please try again.";

      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? { ...m, content: errorResponse, isTyping: false }
            : m
        )
      );
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Toaster richColors position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-2rem)]">
          <SystemPrompt
            prompts={prompts}
            currentPromptId={currentPromptId}
            currentPromptContent={currentPromptContent}
            onPromptContentChange={setCurrentPromptContent}
            onVersionChange={handleVersionChange}
            onSave={handlePromptSave}
            onRun={handlePromptRun}
            isSaving={isSaving}
            onReset={handleResetPrompts}
          />
          <LiveChat
            messages={messages}
            onSendMessage={handleSendMessage}
            models={AVAILABLE_MODELS}
            currentModel={currentModel}
            onModelChange={setCurrentModel}
            onClearChat={handleClearChat}
            currentVersion={
              prompts.find((p) => p.id === currentPromptId)?.version
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
