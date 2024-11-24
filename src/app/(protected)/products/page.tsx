"use client";

import { useQuery } from "@tanstack/react-query";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { useApi } from "@/hooks/useApi";
import { Product } from "@/lib/types";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import ProductCard from "@/components/products/ProductCard";

export default function ProductsPage() {
  const api = useApi();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get<Product[]>("/products"),
  });

  return (
    <ProtectedLayout>
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)
          : products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </ProtectedLayout>
  );
}
