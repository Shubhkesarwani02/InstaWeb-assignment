import React from 'react';

const ElementComponent = ({ element, ...props }) => {
  return (
    <div className="element-component" {...props}>
      {element?.type === 'text' && <p>{element.content}</p>}
      {element?.type === 'image' && <img src={element.src} alt={element.alt || 'Element'} />}
      {element?.type === 'button' && <button>{element.label || 'Button'}</button>}
    </div>
  );
};

export default ElementComponent;