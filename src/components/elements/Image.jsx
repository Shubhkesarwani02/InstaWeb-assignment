/* eslint-disable no-unused-vars */
import { useDrag } from 'react-dnd';
import { useBuilderContext } from '../../contexts/BuilderContext';
import PropTypes from 'prop-types';

const Image = ({ element, isSelected, onClick, style }) => {
  const { updateElement } = useBuilderContext();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'POSITIONED_ELEMENT',
    item: { id: element.id, type: element.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [element.id]);

  const imageStyles = {
    ...style,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    border: isSelected ? '2px solid #4f46e5' : 'none',
    outline: isSelected ? '2px solid rgba(79, 70, 229, 0.3)' : 'none',
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: element.style.backgroundColor || '#f3f4f6',
    borderRadius: element.style.borderRadius || '4px',
    pointerEvents: 'all'
  };

  const imgStyles = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: element.style.objectFit || 'cover',
    width: '100%',
    height: '100%',
  };

  return (
    <div 
      ref={drag}
      style={imageStyles}
      onClick={onClick}
      className="element image-element"
    >
      <img 
        src={element.content || '/src/assets/images/placeholder.jpg'} 
        alt={element.settings?.alt || 'Image'}
        style={imgStyles}
      />
    </div>
  );
};

Image.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.string,
    style: PropTypes.object,
    settings: PropTypes.object,
  }).isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

Image.defaultProps = {
  isSelected: false,
  style: {},
};

export default Image;