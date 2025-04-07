import React from 'react';
import { useBuilder } from '../../contexts/BuilderContext';

const Header = () => {
  const { exportWebsite, saveProject, currentProject } = useBuilder();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Websites.co.in Builder</h1>
        {currentProject && <span className="ml-4 text-gray-300">Project: {currentProject.name}</span>}
      </div>
      <div className="flex gap-4">
        <button 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          onClick={saveProject}
        >
          Save
        </button>
        <button 
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          onClick={exportWebsite}
        >
          Export
        </button>
      </div>
    </header>
  );
};

export default Header;