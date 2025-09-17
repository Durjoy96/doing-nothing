import React from "react";
import LeaderboardTable from "./leaderboard-table";

export default async function TopSevenLeaderboard() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/leaderboard/top-seven`,
    {
      cache: "no-cache",
    }
  );
  const data = await result.json();

  return (
    <>
      <div className="relative">
        <div className="absolute -top-1 right-0">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
          </span>
        </div>
        <LeaderboardTable data={data.top7} leaderboardBtn={true} />
      </div>
    </>
  );
}
