import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("leaderboard");

    const now = new Date();
    const dayOfWeek = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0); //reset time to 00:00:00
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

    const thisWeekTopPlayers = await collection
      .find({ createdAt: { $gte: startOfWeek } })
      .sort({ totalSeconds: -1 })
      .toArray();
    return NextResponse.json({ thisWeekTopPlayers, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong", status: 400 });
  }
}
