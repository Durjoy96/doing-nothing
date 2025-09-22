import TopSevenLeaderboardUi from "@/components/top-seven-leaderboard-ui";
import { Play } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/leaderboard/this-month?limit=7`,
    {
      cache: "no-cache",
    }
  );
  const data = await result.json();
  return (
    <>
      <div data-theme="forest" className="font-inter bg-base-200">
        <div className="max-w-7xl min-h-screen mx-auto px-5 flex  flex-col lg:flex-row lg:justify-between lg:items-center gap-12 lg:gap-0 py-8">
          <div className="text-center lg:text-left">
            <h1 className="font-fredoka text-base-content text-4xl md:text-5xl lg:text-6xl font-semibold max-w-[700px] tracking-tight leading-none">
              The hardest game you’ll ever play… by doing nothing
            </h1>
            <Link
              href="/play"
              className="btn btn-primary rounded-full btn-lg lg:btn-xl btn-wide mt-8 lg:mt-12 font-fredoka lg:text-xl"
            >
              <Play className="w-5 h-5 fill-primary-content" /> Play Now!
            </Link>
          </div>
          {/* this month top 7 players leaderboard */}
          <div>
            <TopSevenLeaderboardUi players={data.thisMonthTopPlayers} />
          </div>
        </div>
      </div>
    </>
  );
}
