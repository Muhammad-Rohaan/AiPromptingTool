import { GoogleGenAI } from "@google/genai";
import { type AIMode } from "@shared/schema";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface PromptEnhancementRequest {
  mode: AIMode;
  description: string;
  style?: string;
  lighting?: string;
  cameraAngle?: string;
  mood?: string;
  additionalDetails?: string;
}

// Mode-specific optimization strategies
const modeStrategies: Record<AIMode, string> = {
  sora: `You are an expert at crafting prompts for OpenAI's Sora video generation model.
Sora excels at:
- Cinematic camera movements and transitions
- Realistic physics and motion
- Temporal consistency across frames
- Complex scenes with multiple subjects
- Dynamic lighting and atmospheric effects

Focus on: Camera work, motion dynamics, temporal flow, scene composition, and physical realism.
Include specific camera movements (pan, dolly, crane, tracking), motion descriptions, timing/pacing details.`,

  veo3: `You are an expert at crafting prompts for Google's VEO3 video generation model.
VEO3 excels at:
- High-quality photorealistic video synthesis
- Natural movement and realistic physics
- Complex lighting scenarios
- Detailed textures and materials
- Smooth temporal coherence

Focus on: Visual fidelity, material properties, lighting conditions, movement realism, and environmental details.
Include specific technical details about quality, resolution preferences, and realistic rendering.`,

  gemini: `You are an expert at crafting prompts for Google's Gemini multimodal AI.
Gemini excels at:
- Understanding complex multimodal inputs
- Generating detailed visual descriptions
- Reasoning about spatial relationships
- Creating contextually rich scenes
- Combining visual and conceptual elements

Focus on: Conceptual depth, spatial relationships, contextual details, visual hierarchy, and compositional balance.
Include detailed descriptions of relationships between objects, conceptual themes, and symbolic elements.`,

  "nano-banana": `You are an expert at crafting prompts for Nano Banana specialized AI model.
Nano Banana excels at:
- Abstract and artistic visualizations
- Data-driven imagery
- Unique stylistic interpretations
- Creative and experimental outputs
- Non-traditional visual representations

Focus on: Creative interpretation, artistic style, experimental techniques, unique perspectives, and abstract concepts.
Include artistic references, style descriptions, creative constraints, and experimental approaches.`,
};

export async function enhancePrompt(
  request: PromptEnhancementRequest
): Promise<string> {
  const { mode, description, style, lighting, cameraAngle, mood, additionalDetails } = request;

  // Build the context from optional fields
  const contextParts: string[] = [];
  if (style) contextParts.push(`Style: ${style}`);
  if (lighting) contextParts.push(`Lighting: ${lighting}`);
  if (cameraAngle) contextParts.push(`Camera Angle: ${cameraAngle}`);
  if (mood) contextParts.push(`Mood: ${mood}`);
  if (additionalDetails) contextParts.push(`Additional Details: ${additionalDetails}`);

  const contextString = contextParts.length > 0 
    ? `\n\nAdditional Context:\n${contextParts.join('\n')}` 
    : '';

  const systemPrompt = `${modeStrategies[mode]}

Your task is to take a user's basic description and enhance it into a highly detailed, optimized prompt for ${mode.toUpperCase()}.

Rules:
1. Keep the core concept from the user's description
2. Add technical details relevant to ${mode}
3. Be specific and descriptive
4. Use industry-standard terminology
5. Keep the final prompt concise but comprehensive (2-4 sentences)
6. Focus on visual and technical details, not abstract concepts
7. Make it actionable and clear for the AI model
8. Do NOT include explanations, just return the enhanced prompt`;

  const userPrompt = `User's Description: ${description}${contextString}

Generate an optimized prompt for ${mode.toUpperCase()}:`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        topP: 0.95,
      },
      contents: userPrompt,
    });

    const enhancedPrompt = response.text?.trim();
    
    if (!enhancedPrompt) {
      throw new Error("Empty response from Gemini");
    }

    return enhancedPrompt;
  } catch (error: any) {
    console.error("Gemini API error:", error);
    
    // Check for API key related errors
    if (error?.message?.includes("API key not valid") || 
        error?.message?.includes("INVALID_ARGUMENT") ||
        error?.status === "INVALID_ARGUMENT" ||
        error?.code === 400) {
      throw new Error("INVALID_API_KEY");
    }
    
    throw new Error(`Failed to enhance prompt: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
