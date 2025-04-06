/* eslint-disable no-unused-vars */
import { useDrag } from 'react-dnd';
import { useBuilderContext } from '../../contexts/BuilderContext';
import PropTypes from 'prop-types';

const Button = ({ element, isSelected, onClick, style }) => {
  const { updateElement } = useBuilderContext();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'POSITIONED_ELEMENT',
    item: { id: element.id, type: element.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [element.id]);

  const buttonStyles = {
    ...style,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    backgroundColor: element.style.backgroundColor || '#4f46e5',
    color: element.style.color || '#ffffff',
    padding: element.style.padding || '8px 16px',
    borderRadius: element.style.borderRadius || '4px',
    fontWeight: element.style.fontWeight || 'bold',
    fontSize: element.style.fontSize || '14px',
    textAlign: element.style.textAlign || 'center',
    border: isSelected ? '2px solid #4f46e5' : 'none',
    outline: isSelected ? '2px solid rgba(79, 70, 229, 0.3)' : 'none',
    boxShadow: element.style.boxShadow || 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div
      ref={drag}
      style={buttonStyles}
      onClick={onClick}
      className="element button-element"
    >
      {element.content || 'Button'}
    </div>
  );
};

Button.propTypes = {
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

Button.defaultProps = {
  isSelected: false,
  style: {},
};

export default Button;