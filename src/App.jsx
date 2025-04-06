import { useState } from 'react'
import './App.css'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Canvas from './components/canvas/Canvas'
import Editor from './components/editor/Editor'
import { useBuilderContext } from './contexts/BuilderContext'
import TemplateSelector from './components/templates/TemplateSelector'

function App() {
  const { selectedTemplate } = useBuilderContext();
  const [showEditor, setShowEditor] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleElementSelect = (element) => {
    setSelectedElement(element);
    setShowEditor(true);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        {!selectedTemplate ? (
          <TemplateSelector />
        ) : (
          <>
            <Sidebar />
            <Canvas onElementSelect={handleElementSelect} />
            {showEditor && selectedElement && (
              <Editor 
                element={selectedElement} 
                onClose={() => setShowEditor(false)} 
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App