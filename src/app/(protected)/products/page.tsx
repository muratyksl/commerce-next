"use client";

import { useQuery } from "@tanstack/react-query";
import ProductGrid from "@/components/products/ProductGrid";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { useApi } from "@/hooks/useApi";
import { Product } from "@/lib/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ProductsPage() {
  const api = useApi();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get<Product[]>("/products"),
  });

  if (isLoading) {
    return (
      <ProtectedLayout>
        <LoadingSpinner />
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      {products && <ProductGrid products={products} />}
    </ProtectedLayout>
  );
}
