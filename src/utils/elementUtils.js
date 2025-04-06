import { v4 as uuidv4 } from 'uuid';
import elementDefaults from '../data/elementDefaults';

/**
 * Creates a new element with default properties
 * @param {string} type - The element type
 * @param {object} position - The position {x, y} on canvas
 * @returns {object} A new element object
 */
export const createElement = (type, position = { x: 0, y: 0 }) => {
  if (!elementDefaults[type]) {
    console.error(`Element type not found: ${type}`);
    return null;
  }

  return {
    id: uuidv4(),
    type,
    content: elementDefaults[type].content,
    position,
    size: { ...elementDefaults[type].size },
    style: { ...elementDefaults[type].style },
    settings: { ...(elementDefaults[type].settings || {}) }
  };
};

/**
 * Checks if a position is within an element's bounds
 * @param {object} position - Position {x, y} to check
 * @param {object} element - Element to check against
 * @returns {boolean} True if position is within element bounds
 */
export const isPositionWithinElement = (position, element) => {
  return (
    position.x >= element.position.x &&
    position.x <= element.position.x + element.size.width &&
    position.y >= element.position.y &&
    position.y <= element.position.y + element.size.height
  );
};

/**
 * Checks if a position is within a drop zone
 * @param {object} position - Position {x, y} to check
 * @param {object} zone - Drop zone to check against
 * @returns {boolean} True if position is within zone
 */
export const isPositionWithinZone = (position, zone) => {
  return (
    position.x >= zone.x &&
    position.x <= zone.x + zone.width &&
    position.y >= zone.y &&
    position.y <= zone.y + zone.height
  );
};

/**
 * Gets the top-most element at a given position
 * @param {object} position - Position {x, y} to check
 * @param {array} elements - Array of elements
 * @returns {object|null} The top-most element or null
 */
export const getElementAtPosition = (position, elements) => {
  // Iterate in reverse to get top-most (last rendered) element first
  for (let i = elements.length - 1; i >= 0; i--) {
    if (isPositionWithinElement(position, elements[i])) {
      return elements[i];
    }
  }
  return null;
};

/**
 * Gets the drop zone at a given position
 * @param {object} position - Position {x, y} to check
 * @param {array} dropZones - Array of drop zones
 * @returns {object|null} The drop zone or null
 */
export const getDropZoneAtPosition = (position, dropZones) => {
  for (let i = 0; i < dropZones.length; i++) {
    if (isPositionWithinZone(position, dropZones[i])) {
      return dropZones[i];
    }
  }
  return null;
};

/**
 * Converts element styles object to CSS string
 * @param {object} styles - Element style object
 * @returns {string} CSS style string
 */
export const styleObjectToCss = (styles) => {
  if (!styles || typeof styles !== 'object') return '';
  
  return Object.entries(styles)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join(' ');
};