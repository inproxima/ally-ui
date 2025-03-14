import axios from 'axios';

class AnthropicService {
  constructor() {
    this.apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
    this.baseURL = 'https://api.anthropic.com/v1';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      }
    });
  }

  async generateCompletion(promptData) {
    try {
      const { systemPrompt, userPrompt, model, temperature, variables } = promptData;
      
      // Replace variable tokens in prompts
      const processedSystemPrompt = this.replaceVariables(systemPrompt, variables);
      const processedUserPrompt = this.replaceVariables(userPrompt, variables);
      
      // Map internal model names to Anthropic model names
      const modelMap = {
        'MODEL_CLAUDE_3_OPUS': 'claude-3-opus-20240229',
        'MODEL_CLAUDE_3_SONNET': 'claude-3-sonnet-20240229',
        'MODEL_CLAUDE_3_HAIKU': 'claude-3-haiku-20240307'
      };
      
      // Default to Claude 3 Haiku if model not found in map
      const anthropicModel = modelMap[model] || 'claude-3-haiku-20240307';
      
      const response = await this.client.post('/messages', {
        model: anthropicModel,
        system: processedSystemPrompt,
        messages: [
          { role: 'user', content: processedUserPrompt }
        ],
        temperature: temperature,
        max_tokens: 2000
      });
      
      return {
        result: response.data.content[0].text,
        usage: {
          prompt_tokens: response.data.usage.input_tokens,
          completion_tokens: response.data.usage.output_tokens,
          total_tokens: response.data.usage.input_tokens + response.data.usage.output_tokens
        },
        model: model
      };
    } catch (error) {
      console.error('Error generating completion with Anthropic:', error);
      
      // Return a more detailed error object
      return {
        error: true,
        message: error.response?.data?.error?.message || error.message,
        status: error.response?.status,
        details: error.response?.data
      };
    }
  }
  
  // Helper function to replace variable tokens in prompts
  replaceVariables(text, variables) {
    if (!text || !variables) return text;
    
    let processedText = text;
    
    // Replace simple variables like {variable_name}
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`{${key}}`, 'g');
      processedText = processedText.replace(regex, variables[key]);
    });
    
    // Replace nested variables like {object.property}
    Object.keys(variables).forEach(key => {
      if (typeof variables[key] === 'object' && variables[key] !== null) {
        Object.keys(variables[key]).forEach(nestedKey => {
          const regex = new RegExp(`{${key}.${nestedKey}}`, 'g');
          processedText = processedText.replace(regex, variables[key][nestedKey]);
        });
      }
    });
    
    return processedText;
  }
  
  // Method to test the API connection
  async testConnection() {
    try {
      const response = await this.client.post('/messages', {
        model: 'claude-3-haiku-20240307',
        system: 'You are a helpful assistant.',
        messages: [
          { role: 'user', content: 'Hello, are you working?' }
        ],
        max_tokens: 50
      });
      
      return {
        success: true,
        message: 'API connection successful',
        response: response.data.content[0].text
      };
    } catch (error) {
      console.error('API connection test failed:', error);
      return {
        success: false,
        message: 'API connection failed',
        error: error.response?.data?.error?.message || error.message
      };
    }
  }
}

export default new AnthropicService(); 