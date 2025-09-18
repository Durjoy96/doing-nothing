"use client";

import { useValue } from "@/lib/provider";
import RulesModal from "@/components/rules-modal";
import Timer from "@/components/timer";
import React, { useEffect } from "react";
import GameOver from "@/components/game-over";

export default function page() {
  const {
    showTimer,
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
        setIsGameStarted(false); // Stop the game
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

      const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
          repeatedTaskHandler();
          setGameOverReason("Exited Fullscreen");
          console.log("Fullscreen exited (Esc or F11 probably used)");
        }
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
        {!isGameOver && (
          <div className="h-screen flex flex-col items-center justify-center text-inter">
            <span className="text-xl font-normal text-base-content">
              You've done nothing for{" "}
              <span className="font-semibold">
                {showTimer ? <Timer /> : "00:00:00"}
              </span>
            </span>
          </div>
        )}

        {isGameOver && <GameOver />}

        <RulesModal />
      </div>
    </>
  );
}
