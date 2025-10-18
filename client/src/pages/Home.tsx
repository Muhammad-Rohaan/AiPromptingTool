import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ModeSelector } from "@/components/ModeSelector";
import { PromptInputForm } from "@/components/PromptInputForm";
import { GeneratedPromptDisplay } from "@/components/GeneratedPromptDisplay";
import { PromptHistory } from "@/components/PromptHistory";
import { ThemeToggle } from "@/components/ThemeToggle";
import { type AIMode, type PromptHistoryItem, type GeneratePromptRequest } from "@shared/schema";
import { usePromptHistory } from "@/hooks/usePromptHistory";

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<AIMode>("sora");
  const [generatedPrompt, setGeneratedPrompt] = useState<{ prompt: string; mode: AIMode } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { history, addToHistory, deleteFromHistory, clearHistory } = usePromptHistory();

  const handlePromptGenerated = (prompt: string, request: GeneratePromptRequest) => {
    setGeneratedPrompt({ prompt, mode: request.mode });
    addToHistory({
      mode: request.mode,
      originalInput: request.description,
      generatedPrompt: prompt,
      details: {
        style: request.style,
        lighting: request.lighting,
        cameraAngle: request.cameraAngle,
        mood: request.mood,
        additionalDetails: request.additionalDetails,
      },
    });
  };

  const handleHistoryItemClick = (item: PromptHistoryItem) => {
    setSelectedMode(item.mode);
    setGeneratedPrompt({ prompt: item.generatedPrompt, mode: item.mode });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  AI Prompt Generator
                </h1>
                <p className="text-xs text-muted-foreground">
                  Optimize for Sora, VEO3, Gemini & Nano Banana
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Prompt Generator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mode Selector */}
            <ModeSelector
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
            />

            {/* Input Form */}
            <PromptInputForm
              mode={selectedMode}
              onPromptGenerated={handlePromptGenerated}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />

            {/* Generated Prompt Display */}
            {generatedPrompt && (
              <GeneratedPromptDisplay prompt={generatedPrompt.prompt} mode={generatedPrompt.mode} />
            )}
          </div>

          {/* Right Column - Prompt History */}
          <div className="lg:col-span-1">
            <PromptHistory
              history={history}
              onItemClick={handleHistoryItemClick}
              onDelete={deleteFromHistory}
              onClearAll={clearHistory}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
