import { z } from "zod";

// AI Model modes
export const aiModes = ["sora", "veo3", "gemini", "nano-banana"] as const;
export type AIMode = typeof aiModes[number];

// Prompt generation request schema
export const generatePromptSchema = z.object({
  mode: z.enum(aiModes),
  description: z.string().min(1, "Description is required"),
  style: z.string().optional(),
  lighting: z.string().optional(),
  cameraAngle: z.string().optional(),
  mood: z.string().optional(),
  additionalDetails: z.string().optional(),
});

export type GeneratePromptRequest = z.infer<typeof generatePromptSchema>;

// Prompt generation response
export interface GeneratePromptResponse {
  prompt: string;
  mode: AIMode;
}

// Prompt history item (stored in localStorage)
export interface PromptHistoryItem {
  id: string;
  mode: AIMode;
  originalInput: string;
  generatedPrompt: string;
  timestamp: number;
  details?: {
    style?: string;
    lighting?: string;
    cameraAngle?: string;
    mood?: string;
    additionalDetails?: string;
  };
}
