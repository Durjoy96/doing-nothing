import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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
      avatar: `https://api.dicebear.com/9.x/bottts/svg?seed=${name
        .trim()
        .replaceAll(" ", "")}`,
      totalSeconds: Number(totalSeconds),
      createdAt: new Date(),
    };

    const insertedDoc = await collection.insertOne(doc);

    const findInsertedDoc = await collection.findOne({
      _id: new ObjectId(insertedDoc.insertedId),
    });

    const smallerCount = await collection.countDocuments({
      totalSeconds: { $gt: findInsertedDoc.totalSeconds },
    });

    const sameBefore = await collection.countDocuments({
      totalSeconds: findInsertedDoc.totalSeconds,
      _id: { $lt: findInsertedDoc._id },
    });

    const position = smallerCount + sameBefore + 1;

    return Response.json({
      success: true,
      message: "Added to the leaderboard",
      status: 200,
      position,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong", status: 400 });
  }
}
