// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import Toolbox from '../toolbox/Toolbox';
import { useBuilder } from '../../contexts/BuilderContext';
import ElementEditor from '../editor/ElementEditor';
import StyleEditor from '../editor/StyleEditor';

const Sidebar = () => {
  const { selectedElement } = useBuilder();
  const [activeTab, setActiveTab] = useState('elements');

  return (
    <div className="bg-gray-100 w-64 h-full border-r border-gray-300 flex flex-col">
      <div className="flex border-b border-gray-300">
        <button 
          className={`flex-1 py-3 ${activeTab === 'elements' ? 'bg-white font-medium' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('elements')}
        >
          Elements
        </button>
        <button 
          className={`flex-1 py-3 ${activeTab === 'editor' ? 'bg-white font-medium' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('editor')}
          disabled={!selectedElement}
        >
          Editor
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'elements' ? (
          <Toolbox />
        ) : (
          <div className="p-4">
            {selectedElement ? (
              <>
                <ElementEditor />
                <StyleEditor />
              </>
            ) : (
              <p className="text-gray-500 text-center mt-8">
                Select an element to edit its properties
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;