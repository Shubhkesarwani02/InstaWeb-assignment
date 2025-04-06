import { useBuilderContext } from '../../contexts/BuilderContext';

const GridOverlay = () => {
  const { canvasSize } = useBuilderContext();
  const gridSize = 20;
  
  // Calculate the number of lines
  const numHorizontalLines = Math.floor(canvasSize.height / gridSize);
  const numVerticalLines = Math.floor(canvasSize.width / gridSize);
  
  return (
    <div className="grid-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
      {/* Horizontal lines */}
      {Array.from({ length: numHorizontalLines }).map((_, index) => (
        <div
          key={`h-${index}`}
          style={{
            position: 'absolute',
            left: 0,
            top: `${(index + 1) * gridSize}px`,
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(107, 114, 128, 0.1)',
            pointerEvents: 'none'
          }}
        />
      ))}
      
      {/* Vertical lines */}
      {Array.from({ length: numVerticalLines }).map((_, index) => (
        <div
          key={`v-${index}`}
          style={{
            position: 'absolute',
            top: 0,
            left: `${(index + 1) * gridSize}px`,
            width: '1px',
            height: '100%',
            backgroundColor: 'rgba(107, 114, 128, 0.1)',
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
};

export default GridOverlay;