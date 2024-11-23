import { NextResponse } from "next/server";
import { Product } from "@/lib/types";

// Move mock data to API route
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
  {
    id: "2",
    name: "Product 2",
    price: 149.99,
    rating: 4.8,
    image: "https://picsum.photos/400/400",
    description: "Product 2 description",
    arrivalDate: "2024-03-25",
    comments: [],
  },
  // Add more products as needed
];

export async function GET() {
  try {
    return NextResponse.json(mockProducts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
