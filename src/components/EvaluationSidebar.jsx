import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function EvaluationSidebar({
  open,
  onClose,
  models = [],
  config,
  onConfigChange,
}) {
  if (!open) return null;
  const handleModelChange = (value) => {
    onConfigChange({ ...config, model: value });
  };
  const handleCriteriaChange = (e) => {
    onConfigChange({ ...config, criteria: e.target.value });
  };
  return (
    <div className="fixed inset-0 z-40 flex" onClick={onClose}>
      <div
        className="w-72 bg-white dark:bg-gray-900 shadow-lg h-full p-4 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg font-semibold flex justify-between items-center">
          Manage Evaluation
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="space-y-4 my-6">
          <label className="text-sm font-medium ">Evaluation Model</label>
          <Select value={config.model} onValueChange={handleModelChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          <label className="text-sm font-medium">Evaluation Criteria</label>
          <textarea
            className="w-full h-40 p-2 border rounded-md dark:bg-gray-800 mt-2"
            value={config.criteria}
            onChange={handleCriteriaChange}
          />
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={onClose}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
