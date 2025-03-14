import React, { createContext, useState, useEffect } from 'react';
import ConfigurationService from '../services/ConfigurationService';

export const ConfigurationContext = createContext();

export const ConfigurationProvider = ({ children }) => {
  const [configuration, setConfiguration] = useState(null);
  const [activeFunction, setActiveFunction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        const config = await ConfigurationService.loadConfiguration();
        setConfiguration(config);
        if (config.functions.length > 0) {
          setActiveFunction(config.functions[0]);
        }
      } catch (error) {
        console.error('Failed to load configuration:', error);
        // Initialize with default configuration
        setConfiguration({
          functions: [],
          defaultModels: ['MODEL_GPT_4O', 'MODEL_O3_MINI'],
          version: '1.0',
        });
      } finally {
        setLoading(false);
      }
    };

    loadConfiguration();
  }, []);

  const saveConfiguration = async (updatedConfig) => {
    try {
      await ConfigurationService.saveConfiguration(updatedConfig);
      setConfiguration(updatedConfig);
      return true;
    } catch (error) {
      console.error('Failed to save configuration:', error);
      return false;
    }
  };

  const addFunction = async (newFunction) => {
    const updatedConfig = {
      ...configuration,
      functions: [...configuration.functions, newFunction],
    };
    const success = await saveConfiguration(updatedConfig);
    if (success) {
      setActiveFunction(newFunction);
    }
    return success;
  };

  const updateFunction = async (updatedFunction) => {
    const updatedConfig = {
      ...configuration,
      functions: configuration.functions.map(f => 
        f.id === updatedFunction.id ? updatedFunction : f
      ),
    };
    const success = await saveConfiguration(updatedConfig);
    if (success && activeFunction?.id === updatedFunction.id) {
      setActiveFunction(updatedFunction);
    }
    return success;
  };

  const removeFunction = async (functionId) => {
    const updatedConfig = {
      ...configuration,
      functions: configuration.functions.filter(f => f.id !== functionId),
    };
    const success = await saveConfiguration(updatedConfig);
    if (success && activeFunction?.id === functionId) {
      setActiveFunction(updatedConfig.functions[0] || null);
    }
    return success;
  };

  return (
    <ConfigurationContext.Provider
      value={{
        configuration,
        activeFunction,
        setActiveFunction,
        loading,
        addFunction,
        updateFunction,
        removeFunction,
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
}; 