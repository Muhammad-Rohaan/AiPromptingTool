// Storage interface for the prompt generator
// Currently using in-memory storage for prompt history (handled client-side)
// Backend only handles API calls to Gemini

export interface IStorage {
  // Add any server-side storage methods here if needed
}

export class MemStorage implements IStorage {
  constructor() {}
}

export const storage = new MemStorage();
