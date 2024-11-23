import Image from "next/image";
import Link from "next/link";
import { FiStar } from "react-icons/fi";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-square relative overflow-hidden rounded-t-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <FiStar className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
