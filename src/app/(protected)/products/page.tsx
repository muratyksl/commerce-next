"use client";

import { useQuery } from "@tanstack/react-query";
import ProductGrid from "@/components/products/ProductGrid";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

// Temporary mock data
const mockProducts = [
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

export default function ProductsPage() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => Promise.resolve(mockProducts),
  });

  return (
    <ProtectedLayout>
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      {products && <ProductGrid products={products} />}
    </ProtectedLayout>
  );
}
