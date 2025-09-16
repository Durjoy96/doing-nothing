import LeaderboardTable from "@/components/leaderboard-table";
import React from "react";

export default async function Leaderboard() {
  const thisWeek = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/leaderboard/this-week`,
    {
      cache: "no-cache",
    }
  );

  const allTime = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/leaderboard/all-time`,
    {
      cache: "no-cache",
    }
  );

  const thisWeekData = await thisWeek.json();
  const allTimeData = await allTime.json();

  return (
    <div data-theme="forest" className="min-h-screen bg-base-200 font-inter">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex justify-between gap-6 pt-12">
          {/* This Week */}
          <div>
            {/* title */}
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-lg font-bold">This Week</h2>
              <span class="relative flex size-3">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span class="relative inline-flex size-3 rounded-full bg-primary"></span>
              </span>
            </div>
            {/* table */}
            <LeaderboardTable data={thisWeekData.thisWeekTopPlayers} />
          </div>
          {/* all-time */}
          <div>
            {/* title */}
            <div className="mb-3">
              <h2 className="text-lg font-bold">All-Time</h2>
            </div>
            {/* table */}
            <LeaderboardTable data={allTimeData.allTimeTopPlayers} />
          </div>
        </div>
      </div>
    </div>
  );
}
