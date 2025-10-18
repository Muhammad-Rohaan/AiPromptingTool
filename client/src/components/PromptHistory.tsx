import { History, Trash2, X } from "lucide-react";
import { type PromptHistoryItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PromptHistoryProps {
  history: PromptHistoryItem[];
  onItemClick: (item: PromptHistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const modeColors: Record<string, string> = {
  sora: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  veo3: "bg-green-500/10 text-green-500 border-green-500/20",
  gemini: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "nano-banana": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

const modeLabels: Record<string, string> = {
  sora: "Sora",
  veo3: "VEO3",
  gemini: "Gemini",
  "nano-banana": "Nano Banana",
};

export function PromptHistory({
  history,
  onItemClick,
  onDelete,
  onClearAll,
}: PromptHistoryProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg border border-card-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-card-border">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold text-sm">History</h2>
          <span className="text-xs text-muted-foreground">({history.length})</span>
        </div>
        {history.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" data-testid="button-clear-history">
                Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear All History?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all {history.length} prompt{history.length !== 1 ? 's' : ''} from your history.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onClearAll}>Clear All</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* History List */}
      <ScrollArea className="flex-1 max-h-[calc(100vh-300px)]">
        {history.length === 0 ? (
          <div className="p-8 text-center">
            <History className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No prompts yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Generated prompts will appear here
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="group relative bg-muted/30 rounded-lg border border-card-border p-3 hover-elevate active-elevate-2 cursor-pointer transition-all"
                onClick={() => onItemClick(item)}
                data-testid={`history-item-${item.id}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded border ${modeColors[item.mode]}`}>
                    {modeLabels[item.mode]}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(item.timestamp)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                      }}
                      data-testid={`button-delete-${item.id}`}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-foreground line-clamp-2 mb-1">
                  {item.originalInput}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 font-mono">
                  {item.generatedPrompt}
                </p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
