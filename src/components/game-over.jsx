"use client";

import { useValue } from "@/lib/provider";
import React, { useEffect, useState } from "react";
import LeaderboardInputModal from "./leaderboard-input-modal";
import { RotateCcw, Trophy } from "lucide-react";
import LeaderboardTable from "./leaderboard-table";
import Link from "next/link";
import TopSevenLeaderboardUi from "./top-seven-leaderboard-ui";

export default function GameOver() {
  const {
    totalSeconds,
    gameOverReason,
    gameStartHandler,
    isGameOver,
    leaderboardPosition,
  } = useValue();

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const hours = Math.floor(totalSeconds / 3600) || 0;
  const minutes = Math.floor(totalSeconds / 60) || 0;
  const seconds = totalSeconds % 60 || 0;

  //fetch top 7 player data
  useEffect(() => {
    if (!isGameOver) return;
    fetch("/api/leaderboard/this-month?limit=7")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboardData(data);
        setLoading(() => false);
      });
  }, [isGameOver, leaderboardPosition]);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-5 flex flex-col lg:items-center gap-12 font-inter pt-12">
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
        {/* buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() =>
              document.getElementById("leaderboard-input-modal").showModal()
            }
            className="btn btn-lg btn-primary rounded-full text-base font-medium"
          >
            <Trophy className="w-5 h-5" /> Save to Leaderboard
          </button>
          <button
            onClick={gameStartHandler}
            className="btn btn-lg btn-accent btn-soft rounded-full text-base font-medium transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" /> Try Again?
          </button>
        </div>
      </div>
      {/* leaderboard loading */}
      {loading && (
        <span className="loading loading-spinner loading-lg text-accent"></span>
      )}
      {/* leaderboard */}
      {!loading && (
        <div className="mb-12">
          <TopSevenLeaderboardUi
            players={leaderboardData.thisMonthTopPlayers}
            leaderboardBtn={true}
          />
        </div>
      )}
      <LeaderboardInputModal />
    </div>
  );
}
