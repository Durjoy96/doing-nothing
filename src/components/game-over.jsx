"use client";

import { useValue } from "@/lib/provider";
import React, { useEffect, useState } from "react";
import LeaderboardInputModal from "./leaderboard-input-modal";
import { RotateCcw, Trophy } from "lucide-react";
import LeaderboardTable from "./leaderboard-table";
import Link from "next/link";

export default function GameOver() {
  const { totalSeconds, gameOverReason, gameStartHandler, isGameOver } =
    useValue();
  const hours = Math.floor(totalSeconds / 3600) || 0;
  const minutes = Math.floor(totalSeconds / 60) || 0;
  const seconds = totalSeconds % 60 || 0;
  const [leaderboardData, setLeaderboardData] = useState([]);

  //fetch top 7 player data
  useEffect(() => {
    if (!isGameOver) return;
    fetch("/api/leaderboard/top-seven")
      .then((res) => res.json())
      .then((data) => setLeaderboardData(data));
  }, [isGameOver]);

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-between gap-12 font-inter pt-12">
      <div className="text-center">
        <span className="block font-fredoka text-6xl font-semibold text-error">
          You Lose
        </span>
        <span className="block mt-2 text-base text-base-content/80">
          {gameOverReason}
        </span>
        <span className="block mt-3 text-xl font-normal text-base-content">
          You did <span className="font-semibold">Nothing</span> for{" "}
          <span className="font-semibold">
            {hours > 0 && `${hours} hr `}
            {minutes > 0 && `${minutes} min `}{" "}
            {seconds > 0 && `${seconds} sec `}
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
      </div>
      <div className="mb-12 relative">
        {/* leaderboard table */}
        <div className="relative">
          <div className="absolute -top-1 right-0">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
            </span>
          </div>
          <LeaderboardTable data={leaderboardData.top7} leaderboardBtn={true} />
        </div>
        <div className="absolute mx-[1px] bottom-[1px] rounded-b-2xl bg-gradient-to-b from-base-100 via-base-200 to-base-300 inset-x-0 h-12 flex justify-center items-center">
          <Link
            href="leaderboard"
            className="link text-accent text-xs hover:text-accent/80"
          >
            See full leaderboard
          </Link>
        </div>
      </div>
      <LeaderboardInputModal />
    </div>
  );
}
