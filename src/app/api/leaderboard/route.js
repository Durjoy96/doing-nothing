import clientPromise from "@/lib/mongodb";

export function GET() {
  return Response.json({ success: true });
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("leaderboard");
    const { name, username, websiteUrl, gameOverReason, totalSeconds } =
      await req.json();
    const doc = {
      name: String(name).slice(0, 200).trim(),
      username: username ? String(username).slice(0, 200).trim() : null,
      websiteUrl: websiteUrl ? String(websiteUrl).slice(0, 200).trim() : null,
      gameOverReason: String(gameOverReason).slice(0, 200).trim(),
      avatar: `https://api.dicebear.com/9.x/bottts/svg?seed=${name.trim()}`,
      totalSeconds: Number(totalSeconds),
      createdAt: new Date(),
    };
    await collection.insertOne(doc);
    return Response.json({
      success: true,
      message: "Added to the leaderboard",
      status: 200,
    });
  } catch (error) {
    return Response.json({ message: error.message, status: 400 });
  }
}
