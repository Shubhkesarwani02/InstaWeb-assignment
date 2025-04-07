import React from 'react';
import { useBuilder } from '../../contexts/BuilderContext';
import TemplatePreview from './TemplatePreview';
import templates from '../../data/templates';

const TemplateSelector = () => {
  const { setCurrentTemplate, closeTemplateSelector } = useBuilder();

  const handleSelectTemplate = (template) => {
    setCurrentTemplate(template);
    closeTemplateSelector();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-4/5 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Choose a Template</h2>
          <button 
            onClick={closeTemplateSelector}
            className="p-2 hover:bg-gray-100 rounded"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <TemplatePreview 
              key={template.id}
              template={template}
              onSelect={() => handleSelectTemplate(template)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;