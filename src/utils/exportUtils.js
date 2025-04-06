import { styleObjectToCss } from './elementUtils';

/**
 * Generates HTML code for a single element
 * @param {object} element - The element object
 * @returns {string} HTML code for the element
 */
const generateElementHtml = (element) => {
  const styleStr = styleObjectToCss(element.style);
  
  switch (element.type) {
    case 'heading':
      return `<h2 style="${styleStr}">${element.content}</h2>`;
      
    case 'paragraph':
      return `<p style="${styleStr}">${element.content}</p>`;
      
    case 'image':
      return `<img src="${element.content}" alt="${element.settings?.alt || 'Image'}" style="${styleStr}" />`;
      
    case 'button':
      return `<button style="${styleStr}">${element.content}</button>`;
      
    case 'input':
      return `
        <div style="margin-bottom: 16px;">
          ${element.settings?.label ? `<label style="display: block; margin-bottom: 4px;">${element.settings.label}</label>` : ''}
          <input type="text" placeholder="${element.content}" style="${styleStr}" />
        </div>
      `;
      
    case 'checkbox':
      return `
        <div style="display: flex; align-items: center;">
          <input type="checkbox" id="chk-${element.id}" ${element.settings?.checked ? 'checked' : ''} />
          <label for="chk-${element.id}" style="margin-left: 8px;">${element.content}</label>
        </div>
      `;
      
    case 'radio':
      return `
        <div>
          ${element.settings?.label ? `<label style="display: block; margin-bottom: 8px;">${element.settings.label}</label>` : ''}
          ${(element.settings?.options || ['Option 1', 'Option 2']).map((option, idx) => `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <input type="radio" name="radio-${element.id}" id="radio-${element.id}-${idx}" />
              <label for="radio-${element.id}-${idx}" style="margin-left: 8px;">${option}</label>
            </div>
          `).join('')}
        </div>
      `;
      
    case 'divider':
      return `<hr style="border: none; height: ${element.size.height}px; background-color: ${element.style.backgroundColor || '#d1d5db'}; width: 100%;" />`;
      
    default:
      return '';
  }
};

/**
 * Generates full HTML code for the website
 * @param {array} elements - Array of elements
 * @param {object} template - Template object
 * @returns {string} Complete HTML for the website
 */
export const generateWebsiteHtml = (elements, template) => {
  if (!template) return '';
  
  const sortedElements = [...elements].sort((a, b) => {
    // Sort by Y position primarily
    if (a.position.y !== b.position.y) {
      return a.position.y - b.position.y;
    }
    // Then by X position
    return a.position.x - b.position.x;
  });
  
  const elementsHtml = sortedElements.map(element => {
    return `
      <div style="position: absolute; left: ${element.position.x}px; top: ${element.position.y}px; width: ${element.size.width}px;">
        ${generateElementHtml(element)}
      </div>
    `;
  }).join('\n');
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #111827;
    }
    .template-container {
      position: relative;
      width: ${template.dimensions.width}px;
      height: ${template.dimensions.height}px;
      margin: 0 auto;
      background-image: url('${template.backgroundUrl}');
      background-size: cover;
      background-position: center;
    }
    @media (max-width: 768px) {
      .template-container {
        width: 100%;
        height: auto;
        min-height: ${template.dimensions.height}px;
      }
    }
  </style>
</head>
<body>
  <div class="template-container">
    ${elementsHtml}
  </div>
</body>
</html>
  `;
};

/**
 * Downloads the generated website as an HTML file
 * @param {array} elements - Array of elements
 * @param {object} template - Template object
 */
export const downloadWebsite = (elements, template) => {
  const html = generateWebsiteHtml(elements, template);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}-website.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Previews the website in a new tab
 * @param {array} elements - Array of elements
 * @param {object} template - Template object
 */
export const previewWebsite = (elements, template) => {
  const html = generateWebsiteHtml(elements, template);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  window.open(url, '_blank');
  
  // Clean up the URL object after a delay
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};