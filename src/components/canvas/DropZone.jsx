import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useBuilderContext } from '../../contexts/BuilderContext';
import PropTypes from 'prop-types';

const DropZone = ({ zone, onElementSelect }) => {
  const { addElement, setSelectedElementId } = useBuilderContext();
  const dropZoneRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item, monitor) => {
      const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      
      // Calculate position relative to the drop zone
      const x = clientOffset.x - dropZoneRect.left;
      const y = clientOffset.y - dropZoneRect.top;
      
      // Add element at the drop position within this zone
      const position = {
        x: zone.x + x,
        y: zone.y + y
      };
      
      const newElement = addElement(item.type, position);
      setSelectedElementId(newElement.id);
      onElementSelect(newElement);
      
      return { id: newElement.id };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [zone, addElement, setSelectedElementId, onElementSelect]);

  return (
    <div
      ref={(node) => {
        drop(node);
        dropZoneRef.current = node;
      }}
      className={`drop-zone ${isOver ? 'drop-zone-active' : ''}`}
      style={{
        position: 'absolute',
        left: `${zone.x}px`,
        top: `${zone.y}px`,
        width: `${zone.width}px`,
        height: `${zone.height}px`,
        border: '1px dashed #9ca3af',
        borderRadius: '4px',
        backgroundColor: isOver ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
        zIndex: 0
      }}
    />
  );
};

DropZone.propTypes = {
  zone: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  onElementSelect: PropTypes.func.isRequired,
};

export default DropZone;