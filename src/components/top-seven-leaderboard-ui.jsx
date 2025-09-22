"use client";

import React from "react";
import Ping from "./ping";
import LeaderboardTable from "./leaderboard-table";

export default function TopSevenLeaderboardUi({ players }) {
  return (
    <div className="relative">
      <div className="absolute -top-1 right-0">
        <Ping />
      </div>
      <LeaderboardTable data={players} leaderboardBtn={true} />
    </div>
  );
}
