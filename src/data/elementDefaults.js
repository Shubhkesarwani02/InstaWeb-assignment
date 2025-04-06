// Default properties for each element type
export const elementDefaults = {
    heading: {
      content: 'Heading Text',
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        color: '#111827',
        textAlign: 'left',
        padding: '4px',
        margin: '0',
        backgroundColor: 'transparent',
        lineHeight: '1.2'
      },
      size: { width: 300, height: 60 }
    },
    paragraph: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales velit id turpis lacinia facilisis.',
      style: {
        fontSize: '16px',
        fontWeight: 'normal',
        fontFamily: 'Arial, sans-serif',
        color: '#4b5563',
        textAlign: 'left',
        padding: '4px',
        margin: '0',
        backgroundColor: 'transparent',
        lineHeight: '1.5'
      },
      size: { width: 300, height: 100 }
    },
    image: {
      content: '/src/assets/images/placeholder.jpg',
      style: {
        backgroundColor: '#f3f4f6',
        borderRadius: '4px',
        objectFit: 'cover'
      },
      settings: {
        alt: 'Image'
      },
      size: { width: 300, height: 200 }
    },
    button: {
      content: 'Button',
      style: {
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: '4px',
        fontWeight: 'bold',
        fontSize: '14px',
        textAlign: 'center',
        boxShadow: 'none'
      },
      size: { width: 120, height: 40 }
    },
    input: {
      content: 'Enter text...',
      style: {
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#ffffff'
      },
      settings: {
        label: 'Text Input',
        placeholder: 'Enter text...',
        required: false
      },
      size: { width: 300, height: 60 }
    },
    checkbox: {
      content: 'Checkbox label',
      style: {
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#ffffff'
      },
      settings: {
        checked: false,
        required: false
      },
      size: { width: 300, height: 30 }
    },
    radio: {
      content: 'Radio button options',
      style: {
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#ffffff'
      },
      settings: {
        label: 'Radio Group',
        options: ['Option 1', 'Option 2'],
        required: false
      },
      size: { width: 300, height: 80 }
    },
    divider: {
      content: '',
      style: {
        backgroundColor: '#d1d5db',
      },
      size: { width: 300, height: 2 }
    }
  };
  
  export default elementDefaults;