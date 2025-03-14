import React from 'react';
import { Box, Typography } from '@mui/material';
import MonacoEditor from '@monaco-editor/react';

export default function PromptEditor({
  systemPrompt,
  userPrompt,
  onSystemPromptChange,
  onUserPromptChange,
}) {
  const handleSystemPromptChange = (value) => {
    onSystemPromptChange(value);
  };

  const handleUserPromptChange = (value) => {
    onUserPromptChange(value);
  };

  // Custom highlighting for variables like {unit_plan.outcomes}
  const editorOptions = {
    minimap: { enabled: false },
    lineNumbers: 'on',
    wordWrap: 'on',
    folding: true,
    fontSize: 14,
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        System Prompt:
      </Typography>
      <Box sx={{ border: '1px solid #ccc', borderRadius: 1, mb: 2 }}>
        <MonacoEditor
          height="200px"
          language="markdown"
          theme="light"
          value={systemPrompt}
          options={editorOptions}
          onChange={handleSystemPromptChange}
        />
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        User Prompt:
      </Typography>
      <Box sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
        <MonacoEditor
          height="300px"
          language="markdown"
          theme="light"
          value={userPrompt}
          options={editorOptions}
          onChange={handleUserPromptChange}
        />
      </Box>
    </Box>
  );
} 