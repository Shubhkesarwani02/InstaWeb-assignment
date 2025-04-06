/* eslint-disable no-unused-vars */
import { useDrag } from 'react-dnd';
import { useBuilderContext } from '../../contexts/BuilderContext';
import PropTypes from 'prop-types';

const Heading = ({ element, isSelected, onClick, style }) => {
  const { updateElement } = useBuilderContext();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'POSITIONED_ELEMENT',
    item: { id: element.id, type: element.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [element.id]);

  const headingStyles = {
    ...style,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    color: element.style.color || '#111827',
    fontSize: element.style.fontSize || '24px',
    fontWeight: element.style.fontWeight || 'bold',
    lineHeight: element.style.lineHeight || '1.2',
    textAlign: element.style.textAlign || 'left',
    border: isSelected ? '2px solid #4f46e5' : 'none',
    outline: isSelected ? '2px solid rgba(79, 70, 229, 0.3)' : 'none',
    padding: element.style.padding || '4px',
    margin: element.style.margin || '0',
    backgroundColor: element.style.backgroundColor || 'transparent',
    fontFamily: element.style.fontFamily || 'inherit',
    pointerEvents: 'all'
  };

  return (
    <div 
      ref={drag}
      style={headingStyles}
      onClick={onClick}
      className="element heading-element"
    >
      {element.content || 'Heading Text'}
    </div>
  );
};

Heading.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.string,
    style: PropTypes.object,
  }).isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

Heading.defaultProps = {
  isSelected: false,
  style: {},
};

export default Heading;