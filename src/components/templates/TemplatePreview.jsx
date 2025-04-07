import React from 'react';

const TemplatePreview = ({ template, onSelect }) => {
  return (
    <div 
      className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onSelect}
    >
      <div className="aspect-video bg-gray-100 relative">
        <img 
          src={template.thumbnail} 
          alt={template.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium">{template.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{template.description}</p>
      </div>
    </div>
  );
};

export default TemplatePreview;