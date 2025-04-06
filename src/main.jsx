import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BuilderProvider } from './contexts/BuilderContext'
import { HistoryProvider } from './contexts/HistoryContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <BuilderProvider>
        <HistoryProvider>
          <App />
        </HistoryProvider>
      </BuilderProvider>
    </DndProvider>
  </React.StrictMode>,
)