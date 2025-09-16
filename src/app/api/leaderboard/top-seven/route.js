import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = await db.collection("leaderboard");
    const top7 = await collection
      .find({})
      .sort({ totalSeconds: -1 })
      .limit(7)
      .toArray();
    return NextResponse.json({ top7, success: true, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 400 });
  }
}
