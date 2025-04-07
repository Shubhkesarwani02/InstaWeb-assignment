import { useState, useEffect } from 'react';
import { useBuilderContext } from '../../contexts/BuilderContext';
import './Editor.css';
import ElementEditor from './ElementEditor';
import StyleEditor from './StyleEditor';

const Editor = () => {
  const { selectedElementId, elements } = useBuilderContext();
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    if (selectedElementId) {
      const element = elements.find(el => el.id === selectedElementId);
      setSelectedElement(element);
    } else {
      setSelectedElement(null);
    }
  }, [selectedElementId, elements]);

  if (!selectedElement) {
    return (
      <div className="editor">
        <div className="editor-empty-state">
          <h3>Element Editor</h3>
          <p>Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <h3>Edit {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)}</h3>
        <div className="editor-tabs">
          <button 
            className={`editor-tab ${activeTab === 'content' ? 'active' : ''}`} 
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
          <button 
            className={`editor-tab ${activeTab === 'style' ? 'active' : ''}`} 
            onClick={() => setActiveTab('style')}
          >
            Style
          </button>
        </div>
      </div>
      
      <div className="editor-content">
        {activeTab === 'content' ? (
          <ElementEditor element={selectedElement} />
        ) : (
          <StyleEditor element={selectedElement} />
        )}
      </div>
    </div>
  );
};

export default Editor;