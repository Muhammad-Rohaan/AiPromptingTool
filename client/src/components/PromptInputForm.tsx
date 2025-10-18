import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { type AIMode, generatePromptSchema, type GeneratePromptRequest } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PromptInputFormProps {
  mode: AIMode;
  onPromptGenerated: (prompt: string, request: GeneratePromptRequest) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

const modePlaceholders: Record<AIMode, string> = {
  sora: "A cinematic drone shot of a coastal sunset with waves crashing...",
  veo3: "A time-lapse of a bustling city street transitioning from day to night...",
  gemini: "A photorealistic render of a futuristic workspace with holographic displays...",
  "nano-banana": "An abstract visualization of data flowing through neural networks...",
};

export function PromptInputForm({
  mode,
  onPromptGenerated,
  isGenerating,
  setIsGenerating,
}: PromptInputFormProps) {
  const { toast } = useToast();

  const form = useForm<GeneratePromptRequest>({
    resolver: zodResolver(generatePromptSchema),
    defaultValues: {
      mode,
      description: "",
      style: "",
      lighting: "",
      cameraAngle: "",
      mood: "",
      additionalDetails: "",
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (data: GeneratePromptRequest) => {
      const response: any = await apiRequest("POST", "/api/generate-prompt", data);
      return response;
    },
    onSuccess: (data: any, variables) => {
      onPromptGenerated(data.prompt, variables);
      toast({
        title: "Prompt Generated!",
        description: "Your optimized prompt is ready to use.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate prompt. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsGenerating(false);
    },
  });

  const onSubmit = (data: GeneratePromptRequest) => {
    setIsGenerating(true);
    generateMutation.mutate({ ...data, mode });
  };

  return (
    <div className="bg-card rounded-lg border border-card-border p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Main Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  What do you want to create?
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={modePlaceholders[mode]}
                    className="min-h-32 resize-none text-base"
                    data-testid="input-description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Additional Details Grid */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Optional Details
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Style</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., cinematic, photorealistic, abstract"
                        data-testid="input-style"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lighting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Lighting</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., golden hour, soft studio, dramatic"
                        data-testid="input-lighting"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cameraAngle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Camera Angle</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., wide shot, close-up, aerial view"
                        data-testid="input-camera-angle"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Mood</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., energetic, serene, mysterious"
                        data-testid="input-mood"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="additionalDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Additional Details</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Any other specific requirements or preferences..."
                      className="min-h-20 resize-none"
                      data-testid="input-additional-details"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Generate Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto min-w-48"
            disabled={isGenerating}
            data-testid="button-generate"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Prompt
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
