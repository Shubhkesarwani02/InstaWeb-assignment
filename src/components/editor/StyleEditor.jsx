import { useBuilderContext } from '../../contexts/BuilderContext';
import PropTypes from 'prop-types';

const StyleEditor = ({ element }) => {
  const { updateElement } = useBuilderContext();

  const updateStyle = (property, value) => {
    updateElement(element.id, {
      style: {
        ...element.style,
        [property]: value
      }
    });
  };

  const renderColorPicker = (label, property, defaultValue = '#000000') => {
    return (
      <div className="editor-field">
        <label htmlFor={`style-${property}`}>{label}</label>
        <div className="color-picker">
          <input
            id={`style-${property}-color`}
            type="color"
            value={element.style[property] || defaultValue}
            onChange={(e) => updateStyle(property, e.target.value)}
          />
          <input
            id={`style-${property}`}
            type="text"
            value={element.style[property] || defaultValue}
            onChange={(e) => updateStyle(property, e.target.value)}
          />
        </div>
      </div>
    );
  };

  const renderTypographyControls = () => {
    if (!['heading', 'paragraph', 'button'].includes(element.type)) {
      return null;
    }

    return (
      <div className="style-group">
        <h4 className="style-group-title">Typography</h4>
        
        {renderColorPicker('Text Color', 'color', element.type === 'button' ? '#ffffff' : '#111827')}
        
        <div className="style-row">
          <div className="editor-field">
            <label htmlFor="style-fontSize">Font Size</label>
            <input
              id="style-fontSize"
              type="text"
              value={element.style.fontSize || '16px'}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
            />
          </div>
          <div className="editor-field">
            <label htmlFor="style-fontWeight">Font Weight</label>
            <select
              id="style-fontWeight"
              value={element.style.fontWeight || 'normal'}
              onChange={(e) => updateStyle('fontWeight', e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="lighter">Lighter</option>
            </select>
          </div>
        </div>
        
        <div className="editor-field">
          <label htmlFor="style-textAlign">Text Align</label>
          <select
            id="style-textAlign"
            value={element.style.textAlign || 'left'}
            onChange={(e) => updateStyle('textAlign', e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>
      </div>
    );
  };

  const renderBackgroundControls = () => {
    return (
      <div className="style-group">
        <h4 className="style-group-title">Background</h4>
        {renderColorPicker('Background Color', 'backgroundColor', 
          element.type === 'button' ? '#4f46e5' : 'transparent')}
      </div>
    );
  };

  const renderBorderControls = () => {
    return (
      <div className="style-group">
        <h4 className="style-group-title">Border</h4>
        <div className="editor-field">
          <label htmlFor="style-borderRadius">Border Radius</label>
          <input
            id="style-borderRadius"
            type="text"
            value={element.style.borderRadius || '0px'}
            onChange={(e) => updateStyle('borderRadius', e.target.value)}
          />
        </div>
        
        {element.type === 'button' && (
          <div className="editor-field">
            <label htmlFor="style-boxShadow">Box Shadow</label>
            <select
              id="style-boxShadow"
              value={element.style.boxShadow || 'none'}
              onChange={(e) => updateStyle('boxShadow', e.target.value)}
            >
              <option value="none">None</option>
              <option value="0 1px 2px rgba(0, 0, 0, 0.1)">Light</option>
              <option value="0 4px 8px rgba(0, 0, 0, 0.1)">Medium</option>
              <option value="0 8px 16px rgba(0, 0, 0, 0.1)">Heavy</option>
            </select>
          </div>
        )}
      </div>
    );
  };

  const renderImageControls = () => {
    if (element.type !== 'image') {
      return null;
    }

    return (
      <div className="style-group">
        <h4 className="style-group-title">Image Settings</h4>
        <div className="editor-field">
          <label htmlFor="style-objectFit">Object Fit</label>
          <select
            id="style-objectFit"
            value={element.style.objectFit || 'cover'}
            onChange={(e) => updateStyle('objectFit', e.target.value)}
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="fill">Fill</option>
            <option value="none">None</option>
          </select>
        </div>
        
        <div className="editor-field">
          <label htmlFor="image-alt">Alt Text</label>
          <input
            id="image-alt"
            type="text"
            value={element.settings?.alt || 'Image'}
            onChange={(e) => updateElement(element.id, {
              settings: { ...element.settings, alt: e.target.value }
            })}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="style-editor">
      {renderTypographyControls()}
      {renderBackgroundControls()}
      {renderBorderControls()}
      {renderImageControls()}
    </div>
  );
};

StyleEditor.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    style: PropTypes.object,
    settings: PropTypes.object,
  }).isRequired,
};

export default StyleEditor;