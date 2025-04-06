/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ElementTypes from '../components/elements/ElementTypes';
import { templatesData } from '../data/templates';

const BuilderContext = createContext();

// Create and export the hook with both names for compatibility
export const useBuilderContext = () => useContext(BuilderContext);
export const useBuilder = () => useContext(BuilderContext);

export const BuilderProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [templates, setTemplates] = useState(templatesData);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState({ past: [], present: { elements: [] }, future: [] });
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Initialize templates
  useEffect(() => {
    // This would potentially fetch templates from an API in a real app
    setTemplates(templatesData);
  }, []);

  // Add element to the canvas
  const addElement = useCallback((type, position) => {
    if (!ElementTypes[type]) {
      console.error(`Element type not found: ${type}`);
      return null;
    }

    const newElement = {
      id: uuidv4(),
      type,
      content: ElementTypes[type].defaultContent,
      position: {
        x: position.x || 0,
        y: position.y || 0,
      },
      size: { ...ElementTypes[type].defaultSize },
      style: {},
      settings: {}
    };

    setElements(prevElements => [...prevElements, newElement]);
    
    // Update history
    updateHistory(prevHistory => {
      return {
        past: [...prevHistory.past, { elements: prevHistory.present.elements || [] }],
        present: { elements: [...(prevHistory.present.elements || []), newElement] },
        future: []
      };
    });

    return newElement;
  }, []);

  // Update an existing element
  const updateElement = useCallback((id, updates) => {
    setElements(prevElements => 
      prevElements.map(element => 
        element.id === id ? { ...element, ...updates } : element
      )
    );
    
    // Update history
    updateHistory(prevHistory => {
      const updatedElements = (prevHistory.present.elements || []).map(element => 
        element.id === id ? { ...element, ...updates } : element
      );

      return {
        past: [...prevHistory.past, { elements: prevHistory.present.elements || [] }],
        present: { elements: updatedElements },
        future: []
      };
    });
  }, []);

  // Move an element on the canvas
  const moveElement = useCallback((id, position) => {
    updateElement(id, { position });
  }, [updateElement]);

  // Delete an element from the canvas
  const deleteElement = useCallback((id) => {
    setElements(prevElements => prevElements.filter(element => element.id !== id));
    
    // Update history
    updateHistory(prevHistory => {
      const filteredElements = (prevHistory.present.elements || []).filter(element => element.id !== id);

      return {
        past: [...prevHistory.past, { elements: prevHistory.present.elements || [] }],
        present: { elements: filteredElements },
        future: []
      };
    });
    
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  }, [selectedElementId]);

  // Set current template directly (for TemplateSelector.jsx)
  const setCurrentTemplate = useCallback((template) => {
    setSelectedTemplate(template);
    setElements([]);
    setCanvasSize({ 
      width: template.dimensions?.width || 1200, 
      height: template.dimensions?.height || 800 
    });
    
    // Reset history
    setHistory({ past: [], present: { elements: [] }, future: [] });
  }, []);

  // Select a template by ID (keep this for backward compatibility)
  const selectTemplate = useCallback((templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setElements([]);
      setCanvasSize({ 
        width: template.dimensions?.width || 1200, 
        height: template.dimensions?.height || 800 
      });
      
      // Reset history
      setHistory({ past: [], present: { elements: [] }, future: [] });
    }
  }, [templates]);

  // Open/close template selector
  const openTemplateSelector = useCallback(() => {
    setShowTemplateSelector(true);
  }, []);

  const closeTemplateSelector = useCallback(() => {
    setShowTemplateSelector(false);
  }, []);

  // Save and export functions
  const saveProject = useCallback(() => {
    console.log('Saving project...');
    // Implement save logic here
  }, []);

  const exportWebsite = useCallback(() => {
    console.log('Exporting website...');
    // Implement export logic here
  }, []);

  // Update history (for undo/redo feature)
  const updateHistory = useCallback((updater) => {
    setHistory(prevHistory => {
      if (typeof updater === 'function') {
        return updater(prevHistory);
      }
      return updater;
    });
  }, []);

  const value = {
    elements,
    setElements, // Added for HistoryContext
    templates,
    selectedTemplate,
    selectedElementId,
    canvasSize,
    zoom,
    setZoom,
    addElement,
    updateElement,
    moveElement,
    deleteElement,
    selectTemplate,
    setSelectedElementId,
    history,
    updateHistory,
    // Added functions and properties for TemplateSelector
    setCurrentTemplate,
    showTemplateSelector,
    openTemplateSelector,
    closeTemplateSelector,
    // Added functions for Header
    currentProject,
    saveProject,
    exportWebsite
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
};