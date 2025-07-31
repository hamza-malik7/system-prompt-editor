import React from "react";
import { cn } from "@/lib/utils";

export default function Modal({ open, onClose, children, className }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full p-6",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
