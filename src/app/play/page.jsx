"use client";

import { useValue } from "@/lib/provider";
import RulesModal from "@/components/rules-modal";
import Timer from "@/components/timer";
import React, { useEffect, useState } from "react";

export default function page() {
  const [showTimer, setShowTimer] = useState(false);
  const { isGameOver, setIsGameOver, isRulesModalClose } = useValue();

  useEffect(() => {
    if (isRulesModalClose) {
      window.addEventListener("mousemove", () => {
        console.log("You moved the mouse! Game over.");
        setIsGameOver(true);
      }); // Mouse movement detection

      window.addEventListener("click", () => {
        console.log("You clicked! Game over.");
        // setIsGameOver(true);
      }); // Mouse click detection

      window.addEventListener("keydown", (e) => {
        console.log("pressed key:", e.key);
        setIsGameOver(true);
      }); // Key press detection

      document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
          console.log("Fullscreen exited (Esc or F11 probably used)");
          setIsGameOver(true);
        }
      }); // Fullscreen exit detection
    } else {
      document.getElementById("rules_modal").showModal();
      return;
    }
  }, [isRulesModalClose]);
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

      {isGameOver && (
        <div>
          <h1>Game Over</h1>
        </div>
      )}

      <RulesModal setShowTimer={setShowTimer} />
    </>
  );
}
