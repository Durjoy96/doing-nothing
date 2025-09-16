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
      <div className="max-w-6xl mx-auto px-5 pt-12">
        <div>
          <h2 className="text-4xl font-semibold font-fredoka">
            Can you beat them?
          </h2>
          <p className="text-base text-base-content/70 max-w-2xl mt-2">
            The hall of fame for people who mastered the art of absolutely
            nothing.
          </p>
        </div>
        {/* tables */}
        <div className="flex justify-between gap-6 pt-8">
          {/* This Week */}
          <div>
            {/* title */}
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-lg font-bold">This Week</h3>
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
              <h3 className="text-lg font-bold">All-Time</h3>
            </div>
            {/* table */}
            <LeaderboardTable data={allTimeData.allTimeTopPlayers} />
          </div>
        </div>
      </div>
    </div>
  );
}
