import LeaderboardTable from "@/components/leaderboard-table";
import Ping from "@/components/ping";
import React from "react";

export const metadata = {
  title: "Leaderboard",
  description:
    "The hall of fame for people who mastered the art of absolutely nothing.",
};

export default async function Leaderboard() {
  const thisMonth = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/leaderboard/this-month`,
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

  const thisMonthData = await thisMonth.json();
  const allTimeData = await allTime.json();
  const now = new Date();
  const thisMonthName = now.toLocaleString("default", { month: "long" });

  return (
    <>
      <div data-theme="forest" className="min-h-screen bg-base-200 font-inter">
        <div className="max-w-6xl mx-auto px-5 py-8 lg:py-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold font-fredoka">
              Can you beat them?
            </h2>
            <p className="text-sm lg:text-base text-base-content/70 max-w-2xl mt-2">
              The hall of fame for people who mastered the art of absolutely
              nothing.
            </p>
          </div>
          {/* tables */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6 pt-8">
            {/* This month */}
            <div>
              {/* title */}
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-bold">{thisMonthName}</h3>
                <Ping />
              </div>
              {/* table */}
              <LeaderboardTable data={thisMonthData.thisMonthTopPlayers} />
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
    </>
  );
}
