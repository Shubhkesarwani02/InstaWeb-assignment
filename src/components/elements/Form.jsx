/* eslint-disable no-unused-vars */
import { useDrag } from 'react-dnd';
import { useBuilderContext } from '../../contexts/BuilderContext';
import PropTypes from 'prop-types';

const Form = ({ element, isSelected, onClick, style }) => {
  const { updateElement } = useBuilderContext();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'POSITIONED_ELEMENT',
    item: { id: element.id, type: element.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [element.id]);

  const formStyles = {
    ...style,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    border: isSelected ? '2px solid #4f46e5' : '1px solid #d1d5db',
    outline: isSelected ? '2px solid rgba(79, 70, 229, 0.3)' : 'none',
    padding: element.style.padding || '8px',
    borderRadius: element.style.borderRadius || '4px',
    backgroundColor: element.style.backgroundColor || '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    pointerEvents: 'all'
  };

  const renderFormElement = () => {
    switch (element.type) {
      case 'input':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {element.settings?.label && (
              <label style={{ marginBottom: '4px', fontSize: '14px', color: '#4b5563' }}>
                {element.settings.label}
              </label>
            )}
            <input 
              type="text" 
              placeholder={element.content || 'Enter text...'}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                pointerEvents: 'none'
              }}
              disabled
            />
          </div>
        );
      case 'checkbox':
        return (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <input 
              type="checkbox" 
              disabled 
              style={{ marginRight: '8px', pointerEvents: 'none' }}
            />
            <span>{element.content || 'Checkbox label'}</span>
          </div>
        );
      case 'radio':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {element.settings?.label && (
              <label style={{ marginBottom: '4px', fontSize: '14px', color: '#4b5563' }}>
                {element.settings.label}
              </label>
            )}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <input 
                type="radio" 
                name={`radio-${element.id}`} 
                disabled
                style={{ marginRight: '8px', pointerEvents: 'none' }}
              />
              <span>Option 1</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input 
                type="radio" 
                name={`radio-${element.id}`} 
                disabled
                style={{ marginRight: '8px', pointerEvents: 'none' }}
              />
              <span>Option 2</span>
            </div>
          </div>
        );
      default:
        return <div>Unsupported form element</div>;
    }
  };

  return (
    <div 
      ref={drag}
      style={formStyles}
      onClick={onClick}
      className={`element form-element ${element.type}-element`}
    >
      {renderFormElement()}
    </div>
  );
};

Form.propTypes = {
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

Form.defaultProps = {
  isSelected: false,
  style: {},
};

export default Form;