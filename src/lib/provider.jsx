"use client";

import React, { createContext, useContext, useState } from "react";

export const Context = createContext(null);

export default function Provider({ children }) {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRulesModalClose, setIsRulesModalClose] = useState(false);

  const value = {
    totalSeconds,
    setTotalSeconds,
    isGameOver,
    setIsGameOver,
    isRulesModalClose,
    setIsRulesModalClose,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useValue = () => useContext(Context);
