import React, { useState, useEffect } from 'react';
import { Container, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import FunctionTabsContainer from './components/FunctionTabs/TabsContainer';
import FunctionEditor from './components/Editors/FunctionEditor';
import { ConfigurationProvider } from './context/ConfigurationContext';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConfigurationProvider>
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, boxShadow: 1 }}>
            <h1>Prompt Management System</h1>
            <FunctionTabsContainer />
          </Box>
        </Container>
      </ConfigurationProvider>
    </ThemeProvider>
  );
}

export default App; 