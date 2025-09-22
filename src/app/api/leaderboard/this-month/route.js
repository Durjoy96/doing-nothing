import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 50;

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("leaderboard");

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth, 1);

    const thisMonthTopPlayers = await collection
      .find({ createdAt: { $gte: startOfMonth } })
      .sort({ totalSeconds: -1 })
      .limit(limit)
      .toArray();
    return NextResponse.json({ thisMonthTopPlayers, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong", status: 400 });
  }
}
