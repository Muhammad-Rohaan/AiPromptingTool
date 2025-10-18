import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type AIMode } from "@shared/schema";

interface GeneratedPromptDisplayProps {
  prompt: string;
  mode: AIMode;
}

const modeColors: Record<AIMode, string> = {
  sora: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  veo3: "bg-green-500/10 text-green-500 border-green-500/20",
  gemini: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "nano-banana": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

const modeLabels: Record<AIMode, string> = {
  sora: "Sora",
  veo3: "VEO3",
  gemini: "Gemini",
  "nano-banana": "Nano Banana",
};

export function GeneratedPromptDisplay({ prompt, mode }: GeneratedPromptDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-card-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-card-border bg-muted/30">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">
            Generated Prompt
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-md border ${modeColors[mode]}`}>
            {modeLabels[mode]}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
          data-testid="button-copy-prompt"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>

      {/* Prompt Content */}
      <div className="p-6">
        <p
          className="font-mono text-base leading-relaxed text-foreground whitespace-pre-wrap break-words"
          data-testid="text-generated-prompt"
        >
          {prompt}
        </p>
      </div>
    </div>
  );
}
