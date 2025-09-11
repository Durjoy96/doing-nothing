"use client";

import { useValue } from "@/lib/provider";
import RulesModal from "@/components/rules-modal";
import Timer from "@/components/timer";
import React, { useEffect, useState } from "react";
import GameOver from "@/components/game-over";

export default function page() {
  const [showTimer, setShowTimer] = useState(false);
  const {
    isGameOver,
    setIsGameOver,
    isRulesModalClose,
    gameOverReason,
    setGameOverReason,
  } = useValue();

  useEffect(() => {
    if (isRulesModalClose) {
      const handleMouseMove = () => {
        if (gameOverReason) return;
        console.log("You moved the mouse! Game over.");
        setGameOverReason("Mouse Moved");
        setIsGameOver(true);
      };

      const handleClick = () => {
        if (gameOverReason) return;
        console.log("You clicked the mouse! Game over.");
        setGameOverReason("Mouse Clicked");
        setIsGameOver(true);
      };

      const handleKeyDown = (e) => {
        if (gameOverReason) return;
        console.log("pressed key:", e.key);
        setGameOverReason(`Key Pressed (${e.key})`);
        setIsGameOver(true);
      };

      const handleFullscreenChange = () => {
        if (gameOverReason) return;
        if (!document.fullscreenElement) {
          console.log("Fullscreen exited (Esc or F11 probably used)");
          setGameOverReason("Exited Fullscreen");
          setIsGameOver(true);
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
    } else {
      document.getElementById("rules_modal").showModal();
    }
  }, [isRulesModalClose, gameOverReason]);
  return (
    <>
      {!isGameOver && (
        <div
          id="root"
          data-theme="forest"
          className="h-screen flex flex-col items-center justify-center text-inter"
        >
          <span className="text-xl font-normal text-base-content">
            You've done nothing for{" "}
            <span className="font-semibold">
              {showTimer ? <Timer /> : "00:00:00"}
            </span>
          </span>
        </div>
      )}

      {isGameOver && <GameOver />}

      <RulesModal setShowTimer={setShowTimer} />
    </>
  );
}
