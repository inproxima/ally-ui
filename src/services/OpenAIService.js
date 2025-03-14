import axios from 'axios';

class OpenAIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
  }

  async generateCompletion(promptData) {
    try {
      const { systemPrompt, userPrompt, model, temperature, variables } = promptData;
      
      // Replace variable tokens in prompts
      const processedSystemPrompt = this.replaceVariables(systemPrompt, variables);
      const processedUserPrompt = this.replaceVariables(userPrompt, variables);
      
      // Map internal model names to OpenAI model names
      const modelMap = {
        'MODEL_GPT_4O': 'gpt-4o',
        'MODEL_GPT_4O_2024_08_06': 'gpt-4o-2024-08-06',
        'MODEL_O3_MINI': 'o3-mini'
      };
      
      const openAIModel = modelMap[model] || 'gpt-4o';
      
      const response = await this.client.post('/chat/completions', {
        model: openAIModel,
        messages: [
          { role: 'system', content: processedSystemPrompt },
          { role: 'user', content: processedUserPrompt }
        ],
        temperature: temperature,
        max_tokens: 2000
      });
      
      return {
        result: response.data.choices[0].message.content,
        usage: response.data.usage,
        model: model
      };
    } catch (error) {
      console.error('Error generating completion:', error);
      
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
      const response = await this.client.post('/chat/completions', {
        model: 'o3-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Hello, are you working?' }
        ],
        max_tokens: 50
      });
      
      return {
        success: true,
        message: 'API connection successful',
        response: response.data.choices[0].message.content
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

export default new OpenAIService(); 