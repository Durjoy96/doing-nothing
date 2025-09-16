import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("leaderboard");
    const allTimeTopPlayers = await collection
      .find({})
      .sort({ totalSeconds: -1 })
      .toArray();
    return Response.json({ allTimeTopPlayers, success: true, status: 200 });
  } catch (error) {
    return Response.json({ message: "Something went wrong", status: 400 });
  }
}
