import React, { useContext, useState } from 'react';
import { Box, Tabs, Tab, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FunctionEditor from '../Editors/FunctionEditor';
import { ConfigurationContext } from '../../context/ConfigurationContext';
import { v4 as uuidv4 } from 'uuid';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`function-tabpanel-${index}`}
      aria-labelledby={`function-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `function-tab-${index}`,
    'aria-controls': `function-tabpanel-${index}`,
  };
}

export default function FunctionTabsContainer() {
  const {
    configuration,
    activeFunction,
    setActiveFunction,
    loading,
    addFunction,
  } = useContext(ConfigurationContext);

  const [value, setValue] = useState(0);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleChange = (event, newValue) => {
    if (newValue === configuration.functions.length) {
      // Add new function tab clicked
      handleAddNew();
    } else {
      setValue(newValue);
      setActiveFunction(configuration.functions[newValue]);
    }
  };

  const handleAddNew = () => {
    const newFunction = {
      id: uuidv4(),
      name: 'new_function',
      displayName: 'New Function',
      description: 'Description of the new function',
      promptTemplate: {
        id: uuidv4(),
        name: 'New Template',
        systemPrompt: 'You are a helpful assistant.',
        userPrompt: 'Please help with the following task: {task}',
        temperature: 0.7,
        model: configuration.defaultModels[0],
        variableTokens: ['{task}']
      },
      order: configuration.functions.length + 1,
      enabled: true,
      requiredInputs: ['task'],
      outputField: 'result',
    };
    
    setIsAddingNew(true);
    addFunction(newFunction).then(() => {
      setValue(configuration.functions.length);
      setIsAddingNew(false);
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="function tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {configuration.functions.map((func, index) => (
            <Tab
              key={func.id}
              label={func.displayName}
              {...a11yProps(index)}
              disabled={isAddingNew}
            />
          ))}
          <Tab
            icon={<AddIcon />}
            aria-label="add new function"
            disabled={isAddingNew}
          />
        </Tabs>
      </Box>
      
      {configuration.functions.map((func, index) => (
        <TabPanel key={func.id} value={value} index={index}>
          <FunctionEditor function={func} />
        </TabPanel>
      ))}
    </Box>
  );
} 