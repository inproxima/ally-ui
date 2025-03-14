import OpenAIService from './OpenAIService';
import AnthropicService from './AnthropicService';

class AIService {
  constructor() {
    this.services = {
      openai: OpenAIService,
      anthropic: AnthropicService
    };
    
    // Model provider mapping
    this.modelProviders = {
      // OpenAI models
      'MODEL_GPT_4O': 'openai',
      'MODEL_GPT_4O_2024_08_06': 'openai',
      'MODEL_O3_MINI': 'openai',
      
      // Anthropic models
      'MODEL_CLAUDE_3_OPUS': 'anthropic',
      'MODEL_CLAUDE_3_SONNET': 'anthropic',
      'MODEL_CLAUDE_3_HAIKU': 'anthropic'
    };
  }
  
  // Get the appropriate service for a given model
  getServiceForModel(model) {
    const provider = this.modelProviders[model] || 'openai'; // Default to OpenAI
    return this.services[provider];
  }
  
  // Generate completion using the appropriate service
  async generateCompletion(promptData) {
    const { model } = promptData;
    const service = this.getServiceForModel(model);
    
    return await service.generateCompletion(promptData);
  }
  
  // Test connections to all services
  async testConnections() {
    const results = {};
    
    for (const [provider, service] of Object.entries(this.services)) {
      results[provider] = await service.testConnection();
    }
    
    return results;
  }
  
  // Get available models
  getAvailableModels() {
    return {
      openai: [
        { id: 'MODEL_GPT_4O', name: 'GPT-4o', provider: 'OpenAI' },
        { id: 'MODEL_GPT_4O_2024_08_06', name: 'GPT-4o (2024-08-06)', provider: 'OpenAI' },
        { id: 'MODEL_O3_MINI', name: 'GPT-3.5 Turbo', provider: 'OpenAI' }
      ],
      anthropic: [
        { id: 'MODEL_CLAUDE_3_OPUS', name: 'Claude 3 Opus', provider: 'Anthropic' },
        { id: 'MODEL_CLAUDE_3_SONNET', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
        { id: 'MODEL_CLAUDE_3_HAIKU', name: 'Claude 3 Haiku', provider: 'Anthropic' }
      ]
    };
  }
  
  // Get all available models as a flat array
  getAllModels() {
    const models = this.getAvailableModels();
    return [
      ...models.openai,
      ...models.anthropic
    ];
  }
}

export default new AIService(); 