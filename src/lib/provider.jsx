"use client";

import React, { createContext, useContext, useState } from "react";

export const Context = createContext(null);

export default function Provider({ children }) {
  const [showTimer, setShowTimer] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("");
  const [leaderboardPosition, setLeaderboardPosition] = useState(0);

  const gameStartHandler = () => {
    document.getElementById("root").requestFullscreen(); // Request fullscreen mode

    setShowTimer(true); // Start the timer when the modal is closed
    setTotalSeconds(0); // Reset timer
    setIsGameOver(false); // Reset game over state
    setGameOverReason(""); // Reset game over reason
    setLeaderboardPosition(0);

    setTimeout(() => {
      setIsGameStarted(true); // Start the game
    }, 1000); // Delay for the game end logics to be set up
  };

  const value = {
    showTimer,
    setShowTimer,
    totalSeconds,
    setTotalSeconds,
    isGameOver,
    setIsGameOver,
    isGameStarted,
    setIsGameStarted,
    gameOverReason,
    setGameOverReason,
    gameStartHandler,
    leaderboardPosition,
    setLeaderboardPosition,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useValue = () => useContext(Context);
