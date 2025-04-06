/* eslint-disable no-unused-vars */
import { useDrag } from 'react-dnd';
import { useBuilderContext } from '../../contexts/BuilderContext';
import PropTypes from 'prop-types';

const Paragraph = ({ element, isSelected, onClick, style }) => {
  const { updateElement } = useBuilderContext();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'POSITIONED_ELEMENT',
    item: { id: element.id, type: element.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [element.id]);

  const paragraphStyles = {
    ...style,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    color: element.style.color || '#4b5563',
    fontSize: element.style.fontSize || '16px',
    fontWeight: element.style.fontWeight || 'normal',
    lineHeight: element.style.lineHeight || '1.5',
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
      style={paragraphStyles}
      onClick={onClick}
      className="element paragraph-element"
    >
      {element.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales velit id turpis lacinia facilisis.'}
    </div>
  );
};

Paragraph.propTypes = {
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

Paragraph.defaultProps = {
  isSelected: false,
  style: {},
};

export default Paragraph;