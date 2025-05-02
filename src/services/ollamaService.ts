
export interface Model {
  name: string;
  modified_at: string;
  size: number;
}

export interface OllamaModelsResponse {
  models: Model[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
}

interface ChatCompletionResponse {
  model: string;
  message: {
    role: 'assistant';
    content: string;
  };
}

const API_BASE_URL = 'http://localhost:11434'; // Default Ollama API URL

export const ollamaService = {
  async getModels(): Promise<Model[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tags`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data: OllamaModelsResponse = await response.json();
      return data.models;
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  },

  async chatCompletion(model: string, message: string): Promise<string> {
    try {
      const request: ChatCompletionRequest = {
        model: model,
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        stream: false
      };

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data: ChatCompletionResponse = await response.json();
      return data.message.content;
    } catch (error) {
      console.error('Error in chat completion:', error);
      throw error;
    }
  }
};
