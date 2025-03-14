import React, { useState, useContext } from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Grid,
  Paper,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  Snackbar,
  Chip
} from '@mui/material';
import PromptEditor from './PromptEditor';
import VariableManager from './VariableManager';
import { ConfigurationContext } from '../../context/ConfigurationContext';
import AIService from '../../services/AIService';

export default function FunctionEditor({ function: func }) {
  const { configuration, updateFunction, removeFunction } = useContext(ConfigurationContext);
  
  const [editedFunction, setEditedFunction] = useState(func);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [previewResult, setPreviewResult] = useState('');
  const [testRunning, setTestRunning] = useState(false);
  const [testError, setTestError] = useState(null);
  const [usageStats, setUsageStats] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  
  // Sample test data for variables
  const sampleTestData = {
    grade: '5',
    topic: 'Ecosystems and Biodiversity',
    outcomes: 'Students will understand ecosystem interactions and the importance of biodiversity.',
    temperature: 0.7,
    unit_plan: {
      unit_plan: 'This is a sample unit plan about ecosystems and biodiversity...',
      temperature: 0.7
    }
  };
  
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEditedFunction({
      ...editedFunction,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handlePromptChange = (field, value) => {
    setEditedFunction({
      ...editedFunction,
      promptTemplate: {
        ...editedFunction.promptTemplate,
        [field]: value,
      },
    });
  };
  
  const handleRequiredInputToggle = (input) => {
    const updatedRequiredInputs = editedFunction.requiredInputs.includes(input)
      ? editedFunction.requiredInputs.filter(i => i !== input)
      : [...editedFunction.requiredInputs, input];
    
    setEditedFunction({
      ...editedFunction,
      requiredInputs: updatedRequiredInputs,
    });
  };
  
  const handleSave = async () => {
    const success = await updateFunction(editedFunction);
    if (success) {
      setSnackbarMessage('Function saved successfully');
      setSnackbarSeverity('success');
    } else {
      setSnackbarMessage('Failed to save function');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };
  
  const handleDelete = async () => {
    setConfirmDelete(true);
  };
  
  const confirmDeleteFunction = async () => {
    await removeFunction(editedFunction.id);
    setConfirmDelete(false);
  };
  
  const handleTestRun = async () => {
    setTestRunning(true);
    setTestError(null);
    setUsageStats(null);
    
    try {
      // Prepare the prompt data
      const promptData = {
        systemPrompt: editedFunction.promptTemplate.systemPrompt,
        userPrompt: editedFunction.promptTemplate.userPrompt,
        model: editedFunction.promptTemplate.model,
        temperature: editedFunction.promptTemplate.temperature,
        variables: sampleTestData
      };
      
      // Call the AI service
      const result = await AIService.generateCompletion(promptData);
      
      if (result.error) {
        setTestError(result.message || 'An error occurred during the API call');
        setPreviewResult('');
      } else {
        setPreviewResult(result.result);
        setUsageStats(result.usage);
      }
    } catch (error) {
      console.error('Error in test run:', error);
      setTestError(error.message || 'An unexpected error occurred');
      setPreviewResult('');
    } finally {
      setTestRunning(false);
    }
  };
  
  const handleReset = () => {
    setPreviewResult('');
    setTestError(null);
    setUsageStats(null);
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  // Get all available models
  const allModels = AIService.getAllModels();
  
  // Function to get model display name
  const getModelDisplayName = (modelId) => {
    const model = allModels.find(m => m.id === modelId);
    return model ? `${model.name} (${model.provider})` : modelId;
  };
  
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Function: {editedFunction.displayName}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        {/* Function Properties */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Function Properties
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Function Name"
              name="name"
              value={editedFunction.name}
              onChange={handleChange}
              helperText="Unique identifier (no spaces)"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Display Name"
              name="displayName"
              value={editedFunction.displayName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Output Field"
              name="outputField"
              value={editedFunction.outputField}
              onChange={handleChange}
              helperText="Field to update in unit plan"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Order"
              name="order"
              type="number"
              value={editedFunction.order}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={editedFunction.enabled}
                  onChange={handleChange}
                  name="enabled"
                />
              }
              label="Enabled"
              sx={{ mt: 2 }}
            />
            
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Required Inputs:
            </Typography>
            <List dense>
              {['unit_plan', 'outcomes', 'temperature', 'grade', 'topic'].map((input) => (
                <ListItem key={input} dense button onClick={() => handleRequiredInputToggle(input)}>
                  <Checkbox
                    edge="start"
                    checked={editedFunction.requiredInputs.includes(input)}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={input} />
                </ListItem>
              ))}
            </List>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="model-select-label">Model</InputLabel>
              <Select
                labelId="model-select-label"
                name="model"
                value={editedFunction.promptTemplate.model}
                label="Model"
                onChange={(e) => handlePromptChange('model', e.target.value)}
              >
                {allModels.map((model) => (
                  <MenuItem key={model.id} value={model.id}>
                    {model.name} ({model.provider})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        
        {/* Prompt Editor */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Prompt Editor
            </Typography>
            <PromptEditor
              systemPrompt={editedFunction.promptTemplate.systemPrompt}
              userPrompt={editedFunction.promptTemplate.userPrompt}
              onSystemPromptChange={(value) => handlePromptChange('systemPrompt', value)}
              onUserPromptChange={(value) => handlePromptChange('userPrompt', value)}
            />
          </Paper>
        </Grid>
        
        {/* Variables and Preview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Available Variables
            </Typography>
            <VariableManager />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Test & Preview
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleTestRun}
                disabled={testRunning}
                sx={{ mr: 1 }}
              >
                {testRunning ? 'Running...' : 'Run Test'}
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleReset}
                disabled={testRunning}
              >
                Reset
              </Button>
              
              {usageStats && (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Usage Statistics:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      label={`Prompt Tokens: ${usageStats.prompt_tokens}`} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Chip 
                      label={`Completion Tokens: ${usageStats.completion_tokens}`} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Chip 
                      label={`Total Tokens: ${usageStats.total_tokens}`} 
                      size="small" 
                      color="primary" 
                    />
                    <Chip 
                      label={`Model: ${getModelDisplayName(editedFunction.promptTemplate.model)}`} 
                      size="small" 
                      color="secondary" 
                    />
                  </Box>
                </Box>
              )}
            </Box>
            
            {testError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {testError}
              </Alert>
            )}
            
            <Typography variant="subtitle1">Preview:</Typography>
            <Box
              sx={{
                mt: 1,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 1,
                minHeight: 200,
                backgroundColor: '#f9f9f9',
                whiteSpace: 'pre-wrap',
                maxHeight: '400px',
                overflow: 'auto'
              }}
            >
              {testRunning ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                previewResult
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => setEditedFunction(func)}>
            Cancel
          </Button>
        </Box>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Function
        </Button>
      </Box>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the function "{editedFunction.displayName}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button onClick={confirmDeleteFunction} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
} 