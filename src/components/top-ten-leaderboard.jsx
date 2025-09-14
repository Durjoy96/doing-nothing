import { Globe } from "lucide-react";
import React from "react";

export default async function TopTenLeaderboard() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/leaderboard/top-ten`,
    {
      cache: "no-cache",
    }
  );
  const data = await result.json();

  return (
    <>
      <div>
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
              {data.top10.map((user, idx) => (
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
                    <div>
                      {user.username && (
                        <a
                          href={`https://x.com/${user.username}`}
                          target="_blank"
                          className="link link-hover block text-base font-medium text-base-content text-left"
                        >
                          {user.name}
                        </a>
                      )}
                      {user.username === null && (
                        <span className="block text-base font-medium text-base-content text-left">
                          {user.name}
                        </span>
                      )}
                      {user.websiteUrl && (
                        <a
                          href={user.websiteUrl}
                          target="_blank"
                          className="flex items-center gap-1 link link-hover text-sm font-medium text-base-content/60 group text-left"
                        >
                          <Globe className="w-3 h-3 group-hover:animate-spin" />{" "}
                          {`${user.websiteUrl}`.split("//")[1]}{" "}
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
      </div>
    </>
  );
}
