# AI Prompt Generator

A professional web application for generating optimized image and video prompts for AI models: Sora, VEO3, Gemini, and Nano Banana.

## Overview

This tool uses Gemini AI to intelligently enhance user prompts with model-specific optimizations. Each AI mode has tailored enhancement strategies that understand the unique strengths and capabilities of each model.

## Features

### Core Functionality
- **Multi-Mode Support**: Dedicated optimization for Sora, VEO3, Gemini, and Nano Banana
- **AI-Powered Enhancement**: Uses Gemini 2.5 Flash to intelligently optimize prompts
- **Prompt History**: Automatic saving of generated prompts with localStorage
- **One-Click Copy**: Easy clipboard copy with visual feedback
- **Additional Details**: Optional fields for style, lighting, camera angle, mood, and more
- **Dark/Light Mode**: Theme toggle with persistent preference

### User Interface
- Clean, modern design with excellent contrast and spacing
- Responsive layout that works on all screen sizes
- Properly aligned mode selector tabs
- Real-time prompt history sidebar
- Beautiful loading and error states
- Smooth transitions and interactions

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS + shadcn/ui components
- Wouter for routing
- TanStack Query for data fetching
- React Hook Form with Zod validation

### Backend
- Express.js
- Gemini 2.5 Flash API for prompt enhancement
- Mode-specific optimization strategies

## Architecture

### Data Flow
1. User enters basic description and optional details
2. Form validates input using Zod schemas
3. Request sent to `/api/generate-prompt` endpoint
4. Backend uses Gemini AI with mode-specific system prompts
5. Enhanced prompt returned and displayed
6. Prompt automatically saved to history (localStorage)

### Mode-Specific Strategies

**Sora** (OpenAI Video)
- Focus on camera movements, motion dynamics, temporal flow
- Emphasizes cinematic techniques and realistic physics

**VEO3** (Google Video)
- Focus on photorealistic rendering, material properties
- Emphasizes visual fidelity and natural movement

**Gemini** (Google Multimodal)
- Focus on conceptual depth, spatial relationships
- Emphasizes contextual richness and visual hierarchy

**Nano Banana** (Specialized)
- Focus on abstract visualizations, artistic interpretation
- Emphasizes creative and experimental approaches

## WordPress Integration

The application is built to be easily embedded in WordPress:

### Standalone Build
The production build generates static files that can be embedded:
- Single bundled JavaScript file
- Extracted CSS stylesheet
- No external dependencies required

### Integration Steps
1. Build the project: `npm run build`
2. Upload the generated files from `dist/` to your WordPress media library
3. Embed using a custom HTML block or shortcode
4. The app is self-contained and won't conflict with WordPress styles

## Environment Variables

- `GEMINI_API_KEY`: Required for AI-powered prompt enhancement

## Development

### Running Locally
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Recent Changes

- October 18, 2025: Initial implementation with all core features
- Multi-mode AI prompt generation
- Prompt history with localStorage
- Theme toggle support
- WordPress-ready build configuration
