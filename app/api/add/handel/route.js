import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  const handel = req.nextUrl.searchParams.get("handel");
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");
  const data = await collection.find({ handel }).toArray();
  const safeData = JSON.parse(JSON.stringify(data));
  return Response.json(safeData);
}