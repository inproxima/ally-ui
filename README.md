# Prompt Management System

A React-based UI for managing and customizing AI prompt templates.

## Features

- Create, edit, and delete function configurations
- Customize system and user prompts with a rich editor
- Test prompt execution with a preview feature
- Manage variable tokens for dynamic prompt generation
- Persistent configuration storage

## Project Structure

```
src/
├── components/
│   ├── FunctionTabs/
│   │   └── TabsContainer.js
│   ├── Editors/
│   │   ├── FunctionEditor.js
│   │   ├── PromptEditor.js
│   │   └── VariableManager.js
│   └── Configuration/
├── context/
│   └── ConfigurationContext.js
├── services/
│   └── ConfigurationService.js
└── models/
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

## Usage

1. Navigate to the application in your browser
2. Use the tabs to switch between different function configurations
3. Edit the system and user prompts using the Monaco editor
4. Configure function properties and required inputs
5. Test the prompt execution with the "Run Test" button
6. Save your changes or create new functions as needed

## Dependencies

- React
- Material-UI
- Monaco Editor
- UUID

## License

MIT 