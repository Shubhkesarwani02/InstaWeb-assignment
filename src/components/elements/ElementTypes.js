// Element type definitions and their default properties
const ElementTypes = {
    heading: {
      name: 'Heading',
      description: 'Add a title or subtitle',
      defaultContent: 'Heading Text',
      defaultSize: { width: 300, height: 60 },
    },
    paragraph: {
      name: 'Text',
      description: 'Add a paragraph of text',
      defaultContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales velit id turpis lacinia facilisis.',
      defaultSize: { width: 300, height: 100 },
    },
    image: {
      name: 'Image',
      description: 'Add an image',
      defaultContent: '/src/assets/images/placeholder.jpg',
      defaultSize: { width: 300, height: 200 },
    },
    button: {
      name: 'Button',
      description: 'Add a clickable button',
      defaultContent: 'Button',
      defaultSize: { width: 120, height: 40 },
    },
    input: {
      name: 'Text Input',
      description: 'Add a text input field',
      defaultContent: 'Enter text...',
      defaultSize: { width: 300, height: 60 },
    },
    checkbox: {
      name: 'Checkbox',
      description: 'Add a checkbox',
      defaultContent: 'Checkbox label',
      defaultSize: { width: 300, height: 30 },
    },
    radio: {
      name: 'Radio Button',
      description: 'Add radio button options',
      defaultContent: 'Radio button options',
      defaultSize: { width: 300, height: 80 },
    },
    divider: {
      name: 'Divider',
      description: 'Add a horizontal divider',
      defaultContent: '',
      defaultSize: { width: 300, height: 2 },
    }
  };
  
  export default ElementTypes;