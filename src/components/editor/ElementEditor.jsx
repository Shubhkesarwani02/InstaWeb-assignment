import { useState, useEffect } from 'react';
import { useBuilderContext } from '../../contexts/BuilderContext';
import PropTypes from 'prop-types';

const ElementEditor = ({ element }) => {
  const { updateElement, deleteElement } = useBuilderContext();
  const [content, setContent] = useState(element.content || '');
  
  // Reset content when selected element changes
  useEffect(() => {
    setContent(element.content || '');
  }, [element]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleContentSave = () => {
    updateElement(element.id, { content });
  };

  const handleContentBlur = () => {
    handleContentSave();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleContentSave();
    }
  };

  const handleDelete = () => {
    deleteElement(element.id);
  };

  const renderContentEditor = () => {
    switch (element.type) {
      case 'heading':
      case 'button':
        return (
          <div className="editor-field">
            <label htmlFor="element-content">Text</label>
            <input
              id="element-content"
              type="text"
              value={content}
              onChange={handleContentChange}
              onBlur={handleContentBlur}
              onKeyDown={handleKeyDown}
            />
          </div>
        );
      
      case 'paragraph':
        return (
          <div className="editor-field">
            <label htmlFor="element-content">Text</label>
            <textarea
              id="element-content"
              value={content}
              onChange={handleContentChange}
              onBlur={handleContentBlur}
            />
          </div>
        );
        
      case 'image':
        return (
          <div className="editor-field">
            <label htmlFor="element-content">Image URL</label>
            <input
              id="element-content"
              type="text"
              value={content}
              onChange={handleContentChange}
              onBlur={handleContentBlur}
              onKeyDown={handleKeyDown}
              placeholder="/src/assets/images/placeholder.jpg"
            />
          </div>
        );
        
      default:
        return (
          <div className="editor-field">
            <label htmlFor="element-content">Content</label>
            <input
              id="element-content"
              type="text"
              value={content}
              onChange={handleContentChange}
              onBlur={handleContentBlur}
              onKeyDown={handleKeyDown}
            />
          </div>
        );
    }
  };

  const renderPositionEditor = () => {
    return (
      <div className="style-group">
        <h4 className="style-group-title">Position & Size</h4>
        <div className="style-row">
          <div className="editor-field">
            <label htmlFor="element-x">X Position</label>
            <input
              id="element-x"
              type="number"
              value={element.position.x}
              onChange={(e) => updateElement(element.id, { 
                position: { ...element.position, x: parseInt(e.target.value) || 0 } 
              })}
            />
          </div>
          <div className="editor-field">
            <label htmlFor="element-y">Y Position</label>
            <input
              id="element-y"
              type="number"
              value={element.position.y}
              onChange={(e) => updateElement(element.id, { 
                position: { ...element.position, y: parseInt(e.target.value) || 0 } 
              })}
            />
          </div>
        </div>
        <div className="style-row">
          <div className="editor-field">
            <label htmlFor="element-width">Width</label>
            <input
              id="element-width"
              type="number"
              value={element.size.width}
              onChange={(e) => updateElement(element.id, { 
                size: { ...element.size, width: parseInt(e.target.value) || 0 } 
              })}
            />
          </div>
          <div className="editor-field">
            <label htmlFor="element-height">Height</label>
            <input
              id="element-height"
              type="number"
              value={element.size.height}
              onChange={(e) => updateElement(element.id, { 
                size: { ...element.size, height: parseInt(e.target.value) || 0 } 
              })}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="element-editor">
      {renderContentEditor()}
      {renderPositionEditor()}
      
      <div className="editor-actions">
        <button 
          className="delete-button"
          onClick={handleDelete}
        >
          Delete Element
        </button>
      </div>
    </div>
  );
};

ElementEditor.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    size: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default ElementEditor;