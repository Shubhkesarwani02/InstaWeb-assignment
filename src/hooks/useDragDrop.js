// src/hooks/useDragDrop.js
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { useBuilder } from '../contexts/BuilderContext';

export const useDragDrop = () => {
  const { addElement, moveElement } = useBuilder();
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  // Handle the start of a drag operation
  const handleDragStart = (e, item, isNew = false) => {
    setIsDragging(true);
    setDraggedItem({ ...item, isNew });
    
    // Calculate offset from cursor to element origin
    if (e.target && !isNew) {
      const rect = e.target.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
    
    // Set drag image if needed
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      if (isNew) {
        // Create ghost image for new elements
        const ghost = document.createElement('div');
        ghost.className = 'drag-ghost';
        ghost.textContent = item.type;
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 0, 0);
        setTimeout(() => document.body.removeChild(ghost), 0);
      }
    }
  };

  // Handle the drop operation
  const handleDrop = (e, dropZoneId) => {
    e.preventDefault();
    if (!draggedItem) return;
    
    const dropZone = document.getElementById(dropZoneId);
    if (!dropZone) return;
    
    const dropZoneRect = dropZone.getBoundingClientRect();
    
    // Calculate position relative to drop zone
    const position = {
      x: e.clientX - dropZoneRect.left - dragOffset.x,
      y: e.clientY - dropZoneRect.top - dragOffset.y
    };
    
    if (draggedItem.isNew) {
      // Add new element
      addElement({
        ...draggedItem,
        position,
        dropZoneId
      });
    } else {
      // Move existing element
      moveElement(draggedItem.id, dropZoneId, position);
    }
    
    setIsDragging(false);
    setDraggedItem(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
  };

  // Handle dragover to allow dropping
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return {
    isDragging,
    draggedItem,
    dragRef,
    handleDragStart,
    handleDrop,
    handleDragEnd,
    handleDragOver
  };
};