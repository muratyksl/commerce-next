import { NextRequest, NextResponse } from "next/server";
import { CreateCommentDto } from "@/lib/types";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: CreateCommentDto = await request.json();

    // Here you would typically:
    // 1. Validate the request body
    // 2. Check user authentication
    // 3. Save to database
    // For now, we'll just return a mock response

    const newComment = {
      id: Math.random().toString(),
      productId: params.id,
      userId: "user-1",
      username: "User",
      text: body.text,
      rating: body.rating,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
