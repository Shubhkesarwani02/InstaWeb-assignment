// src/hooks/useDragDrop.js
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { useBuilder } from "../contexts/BuilderContext";

export const useDragDrop = () => {
  const { addElement, moveElement } = useBuilder();
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  const handleDragStart = (e, item, isNew = false) => {
    setIsDragging(true);
    setDraggedItem({ ...item, isNew });

    if (e.target && !isNew) {
      const rect = e.target.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    } else {
      setDragOffset({ x: 0, y: 0 });
    }

    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      if (isNew) {
        const ghost = document.createElement("div");
        ghost.className = "drag-ghost";
        ghost.textContent = item.type;
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 0, 0);
        setTimeout(() => document.body.removeChild(ghost), 0);
      }
    }
  };

  const handleDrop = (e, dropZoneId) => {
    e.preventDefault();
    if (!draggedItem) return;

    const dropZone = document.getElementById(dropZoneId);
    if (!dropZone) return;

    const dropZoneRect = dropZone.getBoundingClientRect();

    const position = {
      x: e.clientX - dropZoneRect.left - dragOffset.x,
      y: e.clientY - dropZoneRect.top - dragOffset.y,
    };

    if (draggedItem.isNew) {
      addElement({
        ...draggedItem,
        position,
        dropZoneId,
      });
    } else {
      moveElement(draggedItem.id, dropZoneId, position);
    }

    setIsDragging(false);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return {
    isDragging,
    draggedItem,
    dragRef,
    handleDragStart,
    handleDrop,
    handleDragEnd,
    handleDragOver,
  };
};
