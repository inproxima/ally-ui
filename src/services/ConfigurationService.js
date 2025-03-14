const CONFIG_STORAGE_KEY = 'prompt_management_config';

class ConfigurationService {
  async loadConfiguration() {
    const storedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
    
    if (storedConfig) {
      return JSON.parse(storedConfig);
    }
    
    // Return default configuration if none exists
    return this.getDefaultConfiguration();
  }
  
  async saveConfiguration(config) {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    return true;
  }
  
  async exportConfiguration() {
    const config = await this.loadConfiguration();
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }
  
  async importConfiguration(configJson) {
    try {
      const config = JSON.parse(configJson);
      // Validate configuration
      if (!config.functions || !Array.isArray(config.functions)) {
        throw new Error('Invalid configuration format');
      }
      await this.saveConfiguration(config);
      return true;
    } catch (error) {
      console.error('Failed to import configuration:', error);
      return false;
    }
  }
  
  getDefaultConfiguration() {
    return {
      functions: [
        {
          id: '1',
          name: 'unit_plan',
          displayName: 'Unit Plan',
          description: 'Creates a comprehensive unit plan for inquiry-based learning',
          promptTemplate: {
            id: 'template1',
            name: 'Unit Plan Template',
            systemPrompt: 'You are an expert in curriculum design and inquiry-based learning.',
            userPrompt: `Create a comprehensive unit plan for grade {grade} on the topic of {topic}. 
            
The unit plan should include:
1. Unit overview and objectives
2. Essential questions
3. Key concepts and skills
4. Learning activities and assessments
5. Resources needed

Consider the following learning outcomes: {outcomes}
Ensure the unit plan follows inquiry-based learning principles and encourages student exploration and discovery.`,
            temperature: 0.7,
            model: 'MODEL_GPT_4O',
            variableTokens: ['{grade}', '{topic}', '{outcomes}']
          },
          order: 1,
          enabled: true,
          requiredInputs: ['grade', 'topic', 'outcomes'],
          outputField: 'unit_plan',
        },
        {
          id: '2',
          name: 'guiding_question',
          displayName: 'Guiding Question',
          description: 'Generates guiding questions for inquiry-based learning',
          promptTemplate: {
            id: 'template2',
            name: 'Guiding Question Template',
            systemPrompt: 'You are an expert in inquiry-based learning.',
            userPrompt: `Instructions:

Evaluate the following lesson: {unit_plan.unit_plan}. 
Identify the guiding question that will drive the inquiry-based learning in this lesson: Facts, Concepts, and Debatable Questions.
For example, a factual question could be: "Why doesn't energy cycle within an ecosystem?" A conceptual question could be: "In what ways could humans impact the
balance of this freshwater ecosystem and its biodiversity?" A debatable question could be: "Using all of the evidence and conclusions you made above, how would you rate the health of the freshwater ecosystem at FEC?"`,
            temperature: 0.7,
            model: 'MODEL_GPT_4O',
            variableTokens: ['{unit_plan.unit_plan}', '{unit_plan.temperature}']
          },
          order: 2,
          enabled: true,
          requiredInputs: ['unit_plan', 'temperature'],
          outputField: 'guiding_question',
        },
        {
          id: '3',
          name: 'essential_knowledge',
          displayName: 'Essential Knowledge',
          description: 'Identifies essential knowledge for the lesson',
          promptTemplate: {
            id: 'template3',
            name: 'Essential Knowledge Template',
            systemPrompt: 'You are an expert in inquiry-based lesson plan design in any scenario.',
            userPrompt: `Review the following inquiry-based lesson plan: {unit_plan.unit_plan} and identify the essential knowledge that students will acquire through the lesson. 
Specifically, outline the required background knowledge, essential skills needed, and key concepts that student need to know to successfully engage in the inquiry-based learning processes.`,
            temperature: 0.7,
            model: 'MODEL_CLAUDE_3_HAIKU',
            variableTokens: ['{unit_plan.unit_plan}', '{unit_plan.temperature}']
          },
          order: 3,
          enabled: true,
          requiredInputs: ['unit_plan', 'temperature'],
          outputField: 'essential_knowledge',
        }
      ],
      defaultModels: [
        // OpenAI models
        'MODEL_GPT_4O', 
        'MODEL_GPT_4O_2024_08_06', 
        'MODEL_O3_MINI',
        // Anthropic models
        'MODEL_CLAUDE_3_OPUS',
        'MODEL_CLAUDE_3_SONNET',
        'MODEL_CLAUDE_3_HAIKU'
      ],
      version: '1.0',
    };
  }
}

export default new ConfigurationService(); 