/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useCallback } from "react";
import { useBuilder } from "./BuilderContext";

const HistoryContext = createContext();

export const useHistoryContext = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
  const { elements, setElements, history, updateHistory } = useBuilder();
  const [maxHistorySize] = useState(30);

  const undo = useCallback(() => {
    if (history.past.length === 0) return;

    const newPresent = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);

    setElements(newPresent.elements || []);

    updateHistory({
      past: newPast,
      present: newPresent,
      future: [history.present, ...history.future],
    });
  }, [history, updateHistory, setElements]);

  const redo = useCallback(() => {
    if (history.future.length === 0) return;

    const newPresent = history.future[0];
    const newFuture = history.future.slice(1);

    setElements(newPresent.elements || []);

    updateHistory({
      past: [...history.past, history.present],
      present: newPresent,
      future: newFuture,
    });
  }, [history, updateHistory, setElements]);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const pushToHistory = useCallback(
    (newState) => {
      updateHistory((prevHistory) => {
        const newPast = [...prevHistory.past, prevHistory.present].slice(
          -maxHistorySize
        );

        return {
          past: newPast,
          present: newState,
          future: [],
        };
      });
    },
    [updateHistory, maxHistorySize]
  );

  const value = {
    undo,
    redo,
    canUndo,
    canRedo,
    pushToHistory,
  };

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};
