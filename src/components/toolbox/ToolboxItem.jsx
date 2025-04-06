import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

const ToolboxItem = ({ type, label, icon, description }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ELEMENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`toolbox-item ${isDragging ? 'dragging' : ''}`}
      title={description}
    >
      <div className="toolbox-item-icon">{icon}</div>
      <div className="toolbox-item-label">{label}</div>
    </div>
  );
};

ToolboxItem.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string,
};

export default ToolboxItem;