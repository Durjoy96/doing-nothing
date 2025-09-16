"use client";

import { useValue } from "@/lib/provider";
import React from "react";
import LeaderboardInputModal from "./leaderboard-input-modal";
import { RotateCcw, Trophy } from "lucide-react";

export default function GameOver() {
  const { totalSeconds, gameOverReason, gameStartHandler } = useValue();
  const hours = Math.floor(totalSeconds / 3600) || 0;
  const minutes = Math.floor(totalSeconds / 60) || 0;
  const seconds = totalSeconds % 60 || 0;
  return (
    <div className="h-screen flex flex-col items-center justify-center font-inter">
      <span className="font-fredoka text-6xl font-semibold text-error">
        You Lose
      </span>
      <span className="mt-2 text-base text-base-content/80">
        {gameOverReason}
      </span>
      <span className="mt-3 text-xl font-normal text-base-content">
        You did <span className="font-semibold">Nothing</span> for{" "}
        <span className="font-semibold">
          {hours > 0 && `${hours} hr `}
          {minutes > 0 && `${minutes} min `} {seconds > 0 && `${seconds} sec `}
        </span>
      </span>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() =>
            document.getElementById("leaderboard-input-modal").showModal()
          }
          className="btn btn-lg btn-primary rounded-full text-base font-medium"
        >
          <Trophy className="w-5 h-5" /> Submit to Leaderboard
        </button>
        <button
          onClick={gameStartHandler}
          className="btn btn-lg btn-accent btn-soft rounded-full text-base font-medium transition-all duration-300"
        >
          <RotateCcw className="w-5 h-5" /> Try Again?
        </button>
      </div>
      <LeaderboardInputModal />
    </div>
  );
}
