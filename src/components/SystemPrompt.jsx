import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SystemPrompt = ({
  prompts,
  currentPromptId,
  currentPromptContent,
  onPromptContentChange,
  onVersionChange,
  onSave,
  onRun,
  onReset,
  isSaving,
}) => {
  const handleTextareaChange = (e) => {
    onPromptContentChange(e.target.value);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">System Prompt</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <div className="flex flex-row space-x-2 justify-center items-center">
          <Select
            value={currentPromptId.toString()}
            onValueChange={(value) => onVersionChange(parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select system prompt version" />
            </SelectTrigger>
            <SelectContent>
              {prompts.map((prompt) => (
                <SelectItem key={prompt.id} value={prompt.id.toString()}>
                  {prompt.version}
                  {prompt.title ? ` - ${prompt.title}` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="destructive" onClick={onReset} className="">
            Reset
          </Button>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 border border-gray-300 rounded-md overflow-hidden">
            <div className="flex h-full">
              <div className="bg-gray-100 px-2 py-2 text-sm text-gray-500 font-mono select-none border-r border-gray-300">
                {currentPromptContent.split("\n").map((_, index) => (
                  <div
                    key={index}
                    className="leading-6 text-right min-w-[2rem]"
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              <textarea
                value={currentPromptContent}
                onChange={handleTextareaChange}
                className="flex-1 p-2 text-sm font-mono resize-none border-none outline-none bg-gray-900 text-gray-100 leading-6"
                style={{
                  minHeight: "100%",
                  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                }}
                placeholder="Enter your system prompt here..."
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={onRun} className="flex-1">
            Run
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isSaving ? "Loading..." : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemPrompt;
