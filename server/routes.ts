import type { Express } from "express";
import { createServer, type Server } from "http";
import { generatePromptSchema, type GeneratePromptResponse } from "@shared/schema";
import { enhancePrompt } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Prompt generation endpoint
  app.post("/api/generate-prompt", async (req, res) => {
    try {
      // Validate request body
      const validationResult = generatePromptSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid request",
          details: validationResult.error.errors,
        });
      }

      const request = validationResult.data;

      // Check for API key
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error: "Gemini API key not configured. Please set GEMINI_API_KEY environment variable.",
        });
      }

      // Generate enhanced prompt using Gemini
      try {
        const enhancedPrompt = await enhancePrompt(request);

        const response: GeneratePromptResponse = {
          prompt: enhancedPrompt,
          mode: request.mode,
        };

        res.json(response);
      } catch (error) {
        console.error("Error generating prompt:", error);
        
        // Check if it's an API key error
        const errorMessage = error instanceof Error ? error.message : "Failed to generate prompt";
        if (errorMessage === "INVALID_API_KEY") {
          return res.status(503).json({
            error: "Invalid Gemini API key. Please provide a valid GEMINI_API_KEY in your environment settings.",
          });
        }
        
        res.status(500).json({
          error: errorMessage,
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({
        error: "An unexpected error occurred",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
