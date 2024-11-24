import { NextRequest, NextResponse } from "next/server";
import { CreateCommentDto } from "@/lib/types";

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body: CreateCommentDto = await request.json();
    const { id } = context.params;

    const newComment = {
      id: Math.random().toString(),
      productId: id,
      userId: "user-1",
      username: "User",
      text: body.text,
      rating: body.rating,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newComment, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
