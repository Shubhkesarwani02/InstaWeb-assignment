// src/hooks/useElementEditor.js
import { useState, useEffect } from 'react';
import { useBuilder } from '../contexts/BuilderContext';
import { getElementDefaults } from '../utils/elementUtils';

export const useElementEditor = (elementId) => {
  const { 
    getElement, 
    updateElement, 
    deleteElement,
    duplicateElement
  } = useBuilder();
  
  const [element, setElement] = useState(null);
  const [properties, setProperties] = useState({});
  const [styles, setStyles] = useState({});
  
  // Load element data when ID changes
  useEffect(() => {
    if (elementId) {
      const elementData = getElement(elementId);
      if (elementData) {
        setElement(elementData);
        setProperties(elementData.properties || {});
        setStyles(elementData.styles || {});
      }
    } else {
      setElement(null);
      setProperties({});
      setStyles({});
    }
  }, [elementId, getElement]);
  
  // Update property value
  const updateProperty = (key, value) => {
    const updatedProperties = { ...properties, [key]: value };
    setProperties(updatedProperties);
    updateElement(elementId, { properties: updatedProperties });
  };
  
  // Update style value
  const updateStyle = (key, value) => {
    const updatedStyles = { ...styles, [key]: value };
    setStyles(updatedStyles);
    updateElement(elementId, { styles: updatedStyles });
  };
  
  // Reset properties to defaults
  const resetProperties = () => {
    if (!element) return;
    
    const defaults = getElementDefaults(element.type);
    setProperties(defaults.properties || {});
    updateElement(elementId, { properties: defaults.properties || {} });
  };
  
  // Reset styles to defaults
  const resetStyles = () => {
    if (!element) return;
    
    const defaults = getElementDefaults(element.type);
    setStyles(defaults.styles || {});
    updateElement(elementId, { styles: defaults.styles || {} });
  };
  
  // Remove element
  const removeElement = () => {
    if (elementId) {
      deleteElement(elementId);
    }
  };
  
  // Clone element
  const cloneElement = () => {
    if (elementId) {
      duplicateElement(elementId);
    }
  };
  
  return {
    element,
    properties,
    styles,
    updateProperty,
    updateStyle,
    resetProperties,
    resetStyles,
    removeElement,
    cloneElement
  };
};