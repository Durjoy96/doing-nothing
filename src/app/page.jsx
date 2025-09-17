import TopSevenLeaderboard from "@/components/top-seven-leaderboard";
import { Play } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div data-theme="forest" className="font-inter bg-base-200">
        <div className="max-w-7xl min-h-screen mx-auto flex items-center justify-between">
          <div className="">
            <h1 className="font-fredoka text-base-content text-3xl lg:text-6xl font-semibold max-w-[700px] tracking-tight leading-none">
              The hardest game you’ll ever play… by doing nothing
            </h1>
            <Link
              href="/play"
              className="btn btn-primary rounded-full btn-lg lg:btn-xl btn-wide mt-8 lg:mt-12 font-fredoka lg:text-xl"
            >
              <Play className="w-5 h-5 fill-primary-content" /> Play Now!
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2 relative">
            <TopSevenLeaderboard />
            <div className="absolute mx-[1px] bottom-[1px] rounded-b-2xl bg-gradient-to-b from-base-100 via-base-200 to-base-300 inset-x-0 h-12 flex justify-center items-center">
              <Link
                href="leaderboard"
                className="link text-accent text-xs hover:text-accent/80"
              >
                See full leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
