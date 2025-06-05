import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"



export async function POST(request) {

  const body = await request.json()
 
  const clint = await clientPromise
  const db = clint.db("linktree")
  const collection = db.collection("links")

  const doc = await collection.findOne({
    userId: body.userId,      
    handel: body.handel
  })

  if (doc) {
    return Response.json({ success: false, error: true, message: "Handel Already exists" })
  }
  const result = await collection.insertOne(body)
  return Response.json({
    success: true
    , message: 'Saved successfully', result: result
  })
}

export async function GET(req) {
  const userId = req.nextUrl.searchParams.get("userId");
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");
  const data = await collection.find({ userId }).toArray();
  const safeData = JSON.parse(JSON.stringify(data));
  return Response.json(safeData);
}


export async function DELETE(req) {
  const body = await req.json();
  const { _id } = body
  if (!_id || !ObjectId.isValid(_id)) {
    return NextResponse.json(({ success: false, message: "Invalid or missing _id" }))
  }
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");
  const result = await collection.deleteOne({ _id: new ObjectId(_id) });
  return NextResponse.json({ success: true, deletedCount: result.deletedCount });
}