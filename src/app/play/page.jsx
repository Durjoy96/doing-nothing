"use client";

import { useValue } from "@/lib/provider";
import RulesModal from "@/components/rules-modal";
import Timer from "@/components/timer";
import React, { useEffect } from "react";
import GameOver from "@/components/game-over";
import InternalServerError from "@/components/internal-server-error";

export default function page() {
  const {
    showTimer,
    setShowTimer,
    isGameOver,
    setIsGameOver,
    isGameStarted,
    setIsGameStarted,
    gameOverReason,
    setGameOverReason,
  } = useValue();

  useEffect(() => {
    if (isGameStarted) {
      const repeatedTaskHandler = () => {
        if (gameOverReason) return; // Prevent multiple triggers
        setIsGameOver(true); // Set game over state
        setShowTimer(false); //don't show the timer
        setIsGameStarted(false); // Stop the game
        setTimeout(() => {
          document.exitFullscreen(); //exit the full screen
        }, 100);
      };

      const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
          repeatedTaskHandler();
          setGameOverReason("Exited Fullscreen");
          console.log("Fullscreen exited (Esc or F11 probably used)");
        }
      };

      const handleMouseMove = () => {
        repeatedTaskHandler();
        setGameOverReason("Mouse Moved");
        console.log("You moved the mouse! Game over.");
      };

      const handleClick = () => {
        repeatedTaskHandler();
        console.log("You clicked the mouse! Game over.");
        setGameOverReason("Mouse Clicked");
      };

      const handleKeyDown = (e) => {
        repeatedTaskHandler();
        setGameOverReason(`Key Pressed (${e.key})`);
        console.log("pressed key:", e.key);
      };

      window.addEventListener("fullscreenchange", handleFullscreenChange);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("click", handleClick);
      window.addEventListener("keydown", handleKeyDown);

      // Cleanup function to remove event listeners
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("click", handleClick);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("fullscreenchange", handleFullscreenChange);
      };
    }
  }, [isGameStarted, gameOverReason]);

  // Show the modal on component mount
  useEffect(() => {
    document.getElementById("rules_modal").showModal();
  }, []);

  return (
    <>
      <div id="root" data-theme="forest" className="min-h-screen bg-base-200">
        {showTimer && <Timer />}

        {isGameOver && <GameOver />}

        {isGameStarted && <InternalServerError />}

        <RulesModal />
      </div>
    </>
  );
}
