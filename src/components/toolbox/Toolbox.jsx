import { useMemo } from 'react';
import './Toolbox.css';
import ToolboxItem from './ToolboxItem';
import { FaHeading, FaFont, FaImage, FaSquare } from 'react-icons/fa';
import { MdTextFields, MdCheckBox, MdRadioButtonChecked } from 'react-icons/md';
import { TbSeparator } from 'react-icons/tb';

const Toolbox = () => {
  const elementTypes = useMemo(() => [
    {
      type: 'heading',
      label: 'Heading',
      icon: <FaHeading />,
      description: 'Add a title or subtitle'
    },
    {
      type: 'paragraph',
      label: 'Text',
      icon: <FaFont />,
      description: 'Add a paragraph of text'
    },
    {
      type: 'image',
      label: 'Image',
      icon: <FaImage />,
      description: 'Add an image'
    },
    {
      type: 'button',
      label: 'Button',
      icon: <FaButton />,
      description: 'Add a clickable button'
    },
    {
      type: 'input',
      label: 'Text Input',
      icon: <MdTextFields />,
      description: 'Add a text input field'
    },
    {
      type: 'checkbox',
      label: 'Checkbox',
      icon: <MdCheckBox />,
      description: 'Add a checkbox'
    },
    {
      type: 'radio',
      label: 'Radio Button',
      icon: <MdRadioButtonChecked />,
      description: 'Add radio button options'
    },
    {
      type: 'divider',
      label: 'Divider',
      icon: <TbSeparator />,
      description: 'Add a horizontal divider'
    }
  ], []);

  return (
    <div className="toolbox">
      <h2 className="toolbox-title">Elements</h2>
      <div className="toolbox-section">
        <h3 className="toolbox-section-title">Content</h3>
        <div className="toolbox-items">
          {elementTypes.slice(0, 4).map(item => (
            <ToolboxItem key={item.type} {...item} />
          ))}
        </div>
      </div>
      <div className="toolbox-section">
        <h3 className="toolbox-section-title">Form Elements</h3>
        <div className="toolbox-items">
          {elementTypes.slice(4).map(item => (
            <ToolboxItem key={item.type} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbox;