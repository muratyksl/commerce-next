"use client";

import { use } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useApi } from "@/hooks/useApi";
import { Product } from "@/lib/types";
import RatingStars from "@/components/products/RatingStars";
import ImageSlider from "@/components/products/ProductDetails/ImageSlider";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import Comments from "@/components/products/ProductDetails/Comments";
import { calculateAverageRating } from "@/lib/utils/calculations";
import ProductDetailsSkeleton from "@/components/products/ProductDetails/ProductDetailsSkeleton";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Tab = ({ isActive, onClick, children }: TabProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 ${
      isActive
        ? "border-b-2 border-blue-500 text-blue-600"
        : "text-gray-600 hover:text-gray-800"
    }`}
  >
    {children}
  </button>
);

export default function ProductDetailPage({ params }: PageProps) {
  const [activeTab, setActiveTab] = useState<"details" | "comments">("details");
  const api = useApi();
  const resolvedParams = use(params) as { id: string };

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", resolvedParams.id],
    queryFn: () => api.get<Product>(`/products/${resolvedParams.id}`),
  });

  return (
    <ProtectedLayout>
      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : product ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageSlider images={product.images || [product.image]} />

            <div>
              <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <RatingStars
                  rating={calculateAverageRating(product.comments)}
                />
                <span className="text-gray-600">
                  ({product.comments.length})
                </span>
              </div>
              <p className="text-2xl font-bold mb-4">${product.price}</p>
              <p className="text-gray-600 mb-4">
                Arrival Date:{" "}
                {format(new Date(product.arrivalDate), "MM.dd.yyyy")}
              </p>
            </div>
          </div>

          <div className="mt-8 border-b">
            <Tab
              isActive={activeTab === "details"}
              onClick={() => setActiveTab("details")}
            >
              Details
            </Tab>
            <Tab
              isActive={activeTab === "comments"}
              onClick={() => setActiveTab("comments")}
            >
              Comments ({product.comments.length})
            </Tab>
          </div>

          <div className="mt-4">
            {activeTab === "details" ? (
              <p className="text-gray-700">{product.description}</p>
            ) : (
              <Comments productId={product.id} comments={product.comments} />
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Product not found
          </h2>
          <p className="mt-2 text-gray-600">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to Products
          </Link>
        </div>
      )}
    </ProtectedLayout>
  );
}
