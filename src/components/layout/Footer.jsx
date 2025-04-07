import React from 'react';
import { useBuilder } from '../../contexts/BuilderContext';

const Footer = () => {
  const { undoAction, redoAction, canUndo, canRedo, currentBreakpoint, setCurrentBreakpoint } = useBuilder();

  const breakpoints = [
    { id: 'desktop', label: 'Desktop', icon: '🖥️', width: '1024px+' },
    { id: 'tablet', label: 'Tablet', icon: '📱', width: '768px' },
    { id: 'mobile', label: 'Mobile', icon: '📱', width: '375px' }
  ];

  return (
    <footer className="bg-gray-800 text-white p-2 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button 
          className={`p-2 rounded ${canUndo ? 'hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'}`}
          onClick={undoAction}
          disabled={!canUndo}
        >
          Undo
        </button>
        <button 
          className={`p-2 rounded ${canRedo ? 'hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'}`}
          onClick={redoAction}
          disabled={!canRedo}
        >
          Redo
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        {breakpoints.map(bp => (
          <button
            key={bp.id}
            className={`p-2 rounded ${currentBreakpoint === bp.id ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            onClick={() => setCurrentBreakpoint(bp.id)}
            title={`${bp.label} (${bp.width})`}
          >
            {bp.icon} {bp.label}
          </button>
        ))}
      </div>
      
      <div className="text-sm text-gray-400">
        Powered by Websites.co.in
      </div>
    </footer>
  );
};

export default Footer;