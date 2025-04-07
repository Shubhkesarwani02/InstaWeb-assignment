/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import ElementTypes from "../components/elements/ElementTypes";
import { templatesData } from "../data/templates";

const BuilderContext = createContext();

export const useBuilderContext = () => useContext(BuilderContext);
export const useBuilder = () => useContext(BuilderContext);

export const BuilderProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [templates, setTemplates] = useState(templatesData);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState({
    past: [],
    present: { elements: [] },
    future: [],
  });
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    setTemplates(templatesData);
  }, []);

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
      settings: {},
    };

    setElements((prevElements) => [...prevElements, newElement]);

    updateHistory((prevHistory) => {
      return {
        past: [
          ...prevHistory.past,
          { elements: prevHistory.present.elements || [] },
        ],
        present: {
          elements: [...(prevHistory.present.elements || []), newElement],
        },
        future: [],
      };
    });

    return newElement;
  }, []);

  const updateElement = useCallback((id, updates) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      )
    );

    updateHistory((prevHistory) => {
      const updatedElements = (prevHistory.present.elements || []).map(
        (element) => (element.id === id ? { ...element, ...updates } : element)
      );

      return {
        past: [
          ...prevHistory.past,
          { elements: prevHistory.present.elements || [] },
        ],
        present: { elements: updatedElements },
        future: [],
      };
    });
  }, []);

  const moveElement = useCallback(
    (id, position) => {
      updateElement(id, { position });
    },
    [updateElement]
  );

  const deleteElement = useCallback(
    (id) => {
      setElements((prevElements) =>
        prevElements.filter((element) => element.id !== id)
      );

      updateHistory((prevHistory) => {
        const filteredElements = (prevHistory.present.elements || []).filter(
          (element) => element.id !== id
        );

        return {
          past: [
            ...prevHistory.past,
            { elements: prevHistory.present.elements || [] },
          ],
          present: { elements: filteredElements },
          future: [],
        };
      });

      if (selectedElementId === id) {
        setSelectedElementId(null);
      }
    },
    [selectedElementId]
  );

  const setCurrentTemplate = useCallback((template) => {
    setSelectedTemplate(template);
    setElements([]);
    setCanvasSize({
      width: template.dimensions?.width || 1200,
      height: template.dimensions?.height || 800,
    });

    setHistory({ past: [], present: { elements: [] }, future: [] });
  }, []);

  const selectTemplate = useCallback(
    (templateId) => {
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        setSelectedTemplate(template);
        setElements([]);
        setCanvasSize({
          width: template.dimensions?.width || 1200,
          height: template.dimensions?.height || 800,
        });

        setHistory({ past: [], present: { elements: [] }, future: [] });
      }
    },
    [templates]
  );

  const openTemplateSelector = useCallback(() => {
    setShowTemplateSelector(true);
  }, []);

  const closeTemplateSelector = useCallback(() => {
    setShowTemplateSelector(false);
  }, []);

  const saveProject = useCallback(() => {
    console.log("Saving project...");
  }, []);

  const exportWebsite = useCallback(() => {
    console.log("Exporting website...");
  }, []);

  const updateHistory = useCallback((updater) => {
    setHistory((prevHistory) => {
      if (typeof updater === "function") {
        return updater(prevHistory);
      }
      return updater;
    });
  }, []);

  const value = {
    elements,
    setElements,
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
    setCurrentTemplate,
    showTemplateSelector,
    openTemplateSelector,
    closeTemplateSelector,
    currentProject,
    saveProject,
    exportWebsite,
  };

  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
};
