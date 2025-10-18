import { type AIMode } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface ModeSelectorProps {
  selectedMode: AIMode;
  onModeChange: (mode: AIMode) => void;
}

const modes: { value: AIMode; label: string; description: string }[] = [
  { value: "sora", label: "Sora", description: "OpenAI video generation" },
  { value: "veo3", label: "VEO3", description: "Google video AI" },
  { value: "gemini", label: "Gemini", description: "Google multimodal AI" },
  { value: "nano-banana", label: "Nano Banana", description: "Specialized model" },
];

export function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="bg-card rounded-lg border border-card-border p-1">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {modes.map((mode) => (
          <Button
            key={mode.value}
            variant={selectedMode === mode.value ? "default" : "ghost"}
            className="flex flex-col items-center justify-center h-auto py-3 px-2 gap-1"
            onClick={() => onModeChange(mode.value)}
            data-testid={`button-mode-${mode.value}`}
          >
            <span className="font-semibold text-sm">{mode.label}</span>
            <span className="text-xs opacity-80 font-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {mode.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
