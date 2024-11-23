import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mocks/products";

export async function GET() {
  try {
    return NextResponse.json(mockProducts);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
