import { Globe } from "lucide-react";
import React from "react";

export default function LeaderboardTable({ data }) {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th>Rank</th>
            <th>Player</th>
            <th>Time Survived</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {/* row */}
          {data?.map((user, idx) => (
            <tr key={user._id} className="text-center">
              {/* rank */}
              <th className="text-primary text-base font-bold">
                <span className="text-xl">{idx + 1 === 1 && "🥇"}</span>
                <span className="text-xl">{idx + 1 === 2 && "🥈"}</span>
                <span className="text-xl">{idx + 1 === 3 && "🥉"}</span>

                {idx + 1 > 3 && idx + 1}
              </th>
              {/* image, name, x, website */}
              <td className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full "
                />
                <div className="text-left">
                  {user.username && (
                    <span className="tooltip tooltip-top" data-tip={user.name}>
                      <a
                        href={`https://x.com/${user.username}`}
                        target="_blank"
                        className="blink link-hover block text-base font-medium text-base-content w-28 truncate"
                      >
                        {user.name}
                      </a>
                    </span>
                  )}
                  {user.username === null && (
                    <span className="tooltip tooltip-top" data-tip={user.name}>
                      <span className="block text-base font-medium text-base-content w-28 truncate cursor-default">
                        {user.name}
                      </span>
                    </span>
                  )}
                  {user.websiteUrl && (
                    <a
                      href={user.websiteUrl}
                      target="_blank"
                      className="flex items-center gap-1 link link-hover text-sm font-medium text-base-content/60 group"
                    >
                      <Globe className="w-3 h-3 group-hover:animate-spin" />{" "}
                      <span
                        className="tooltip tooltip-bottom"
                        data-tip={user.websiteUrl}
                      >
                        <span className="block w-28 truncate">
                          {`${user.websiteUrl}`.split("//")[1]}
                        </span>
                      </span>
                    </a>
                  )}
                </div>
              </td>
              <td className="text-base font-bold text-accent">
                {/* hours */}
                {Math.floor(user.totalSeconds / 3600)
                  ? `${Math.floor(user.totalSeconds / 3600)}h`
                  : ""}{" "}
                {/* minutes */}
                {Math.floor(user.totalSeconds / 60)
                  ? `${Math.floor(user.totalSeconds / 60)}min`
                  : ""}{" "}
                {/* seconds */}
                {Math.floor(user.totalSeconds % 60)
                  ? `${Math.floor(user.totalSeconds % 60)}sec`
                  : ""}
              </td>
              <td>{user.gameOverReason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
