/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useBuilderContext } from '../../contexts/BuilderContext';
import './Canvas.css';
import GridOverlay from './GridOverlay';
import DropZone from './DropZone';
import ElementComponent from '../elements/ElementComponent';

const Canvas = () => {
  const { 
    elements, 
    selectedElementId, 
    setSelectedElementId, 
    canvasSize, 
    zoom,
    moveElement 
  } = useBuilderContext();
  
  const [isGridVisible, setIsGridVisible] = useState(true);
  const canvasRef = useRef(null);
  
  const mainDropZone = {
    x: 0,
    y: 0,
    width: canvasSize.width,
    height: canvasSize.height
  };
  
  const handleElementSelect = (element) => {
    setSelectedElementId(element.id);
  };
  
  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current) {
      setSelectedElementId(null);
    }
  };

  return (
    <div className="canvas-container">
      <div className="canvas-tools">
        <button 
          className={`canvas-tool-button ${isGridVisible ? 'active' : ''}`} 
          onClick={() => setIsGridVisible(!isGridVisible)}
        >
          Grid {isGridVisible ? 'On' : 'Off'}
        </button>
        <span className="zoom-display">{Math.round(zoom * 100)}%</span>
      </div>
      
      <div className="canvas-wrapper">
        <div 
          ref={canvasRef}
          className="canvas"
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            transform: `scale(${zoom})`,
          }}
          onClick={handleCanvasClick}
        >
          {isGridVisible && <GridOverlay />}
          
          <DropZone 
            zone={mainDropZone} 
            onElementSelect={handleElementSelect}
          />
          
          {elements.map(element => (
            <ElementComponent
              key={element.id}
              element={element}
              isSelected={element.id === selectedElementId}
              onClick={() => handleElementSelect(element)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Canvas;