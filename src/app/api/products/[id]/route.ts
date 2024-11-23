import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/lib/types";

// Temporary mock data - in a real app this would come from a database
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 99.99,
    rating: 4.5,
    image: "https://picsum.photos/400/400",
    description: "Product 1 description",
    arrivalDate: "2024-03-20",
    comments: [],
  },
  // Add more mock products as needed
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = mockProducts.find((p) => p.id === params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
