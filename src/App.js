import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown'; // Import dropdown
import { Menubar } from 'primereact/menubar'; // Import Menubar
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css'; // Ensure your CSS styles are included

const App = () => {
  const [visibleRight, setVisibleRight] = useState(false);
  const [mode, setMode] = useState('light');
  const [scale, setScale] = useState(1);
  const [fontSize, setFontSize] = useState(16); // Default font size for content
  const [fontFamily, setFontFamily] = useState('Arial'); // Default font family
  const [menuType, setMenuType] = useState('static');
  const [selectedColor, setSelectedColor] = useState('#FF5733'); // Store selected color

  // Font family options for dropdown
  const fontOptions = [
    { label: 'Lucida', value: 'Lucida Console, Courier New, monospace' },
    { label: 'Cursive', value: 'Cursive' },
    { label: 'Thambha', value: 'Times New Roman, Times, serif' },
    { label: 'Vardhan', value: 'Vardhan' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Verdana', value: 'Verdana, sans-serif' },
    { label: 'Courier New', value: 'Courier New, monospace' },
  ];

  const colorOptions = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5', '#FFA533'];

  // Menubar items
  const menuItems = [
    { label: 'Home', command: () => console.log('Home clicked') },
    { label: 'About', command: () => console.log('About clicked') },
    { label: 'Services', command: () => console.log('Services clicked') },
    { label: 'Contact', command: () => console.log('Contact clicked') },
  ];

  const changeMode = (mode) => {
    setMode(mode);
    document.body.className = `${mode}-mode`;
  };

  const toggleDarkMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    document.body.className = `${mode}-mode`;
  };

  const incrementScale = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2));
  };

  const decrementScale = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const changeMenuType = (type) => {
    setMenuType(type);
    document.body.className = `${type}-menu`;
  };

  const applyColor = (color) => {
    setSelectedColor(color); // Update the selected color state
    document.documentElement.style.setProperty('--selectedColor', color); // Apply the color globally via CSS variable
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => Math.min(prevSize + 2, 24)); // Max font size of 24px
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, 12)); // Min font size of 12px
  };

  useEffect(() => {
    // Apply scaling and font size changes
    document.documentElement.style.transform = `scale(${scale})`;
    document.documentElement.style.fontSize = `${fontSize}px`; // Apply font size change globally
  }, [scale, fontSize]);

  useEffect(() => {
    // Apply font family globally
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

  useEffect(() => {
    // Apply the color change globally
    document.documentElement.style.setProperty('--selectedColor', selectedColor);
  }, [selectedColor]);

  return (
    <div>
      <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} className="custom-sidebar">
        <h3>Customize Options</h3>
        <div className="menu-buttons">
          <h4>Theme</h4>
          <Button label="Light" className="p-button-primary" onClick={() => changeMode('light')} />
          <Button label="Dim" className="p-button-secondary" onClick={() => changeMode('dim')} />
          <Button label="Dark" className="p-button-secondary" onClick={() => changeMode('dark')} />

          <h4>Primary Color</h4>
          <div className="color-picker">
            {colorOptions.map(color => (
              <Button key={color} style={{ backgroundColor: color }} onClick={() => applyColor(color)} />
            ))}
          </div>

          <h4>Font Family</h4>
          <Dropdown
            value={fontFamily}
            options={fontOptions}
            onChange={(e) => setFontFamily(e.value)}
            optionLabel="label"
            optionValue="value"
            placeholder="Select Font"
            className="p-mb-2"
          />

          <h4>Menu Types</h4>
          <Button label="Static" onClick={() => changeMenuType('static')} className="p-button-info p-mb-2" />
          <Button label="Overlay" onClick={() => changeMenuType('overlay')} className="p-button-info p-mb-2" />
          <Button label="Slim" onClick={() => changeMenuType('slim')} className="p-button-info p-mb-2" />
          <Button label="Slim+" onClick={() => changeMenuType('slim+')} className="p-button-info p-mb-2" />
          <Button label="Drawer" onClick={() => changeMenuType('drawer')} className="p-button-info p-mb-2" />
          <Button label="Reveal" onClick={() => changeMenuType('reveal')} className="p-button-info p-mb-2" />
          <Button label="Horizontal" onClick={() => changeMenuType('horizontal')} className="p-button-info p-mb-2" />

          <h4>Additional Options</h4>
          <Button label="Toggle Dark Mode" icon="pi pi-moon" onClick={toggleDarkMode} className="p-button-secondary p-mb-2" /> <br />
          <Button icon="pi pi-plus" onClick={incrementScale} className="p-button-primary p-mb-2" />
          <Button icon="pi pi-minus" onClick={decrementScale} className="p-button-primary p-mb-2" />

          <h4>Font Size</h4>
          <Button icon="pi pi-plus" onClick={increaseFontSize} className="p-button-primary p-mb-2" />
          <Button icon="pi pi-minus" onClick={decreaseFontSize} className="p-button-primary p-mb-2" />
        </div>
      </Sidebar>

      {/* Dynamic Navbar / Menubar */}
      <Menubar model={menuItems} style={{ backgroundColor: selectedColor }} />

      <div className="content" style={{ fontSize: `${fontSize}px`, color: selectedColor }}>
        <h1>Welcome to the Theme Customizer</h1>
        <p>
          This is a sample text to demonstrate the change in theme, primary color, font family, and font size. Use the options in the sidebar to customize the appearance.
        </p>
        <p>Current Scale: {scale}</p>
        <p>Current Font Size: {fontSize}px</p>
        <p>Current Font Family: {fontFamily}</p>
      </div>

      <Button icon="pi pi-cog" className="cog-button" onClick={() => setVisibleRight(true)} />
    </div>
  );
};

export default App;
