import { Product, ProductComment } from "@/lib/types";
import { calculateAverageRating } from "@/lib/utils/calculations";

const mockComments: ProductComment[] = [
  {
    id: "1",
    productId: "1",
    userId: "user-1",
    username: "User",
    text: "Great product!",
    rating: 5,
    createdAt: new Date().toISOString(),
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 99.99,
    rating: calculateAverageRating(mockComments),
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    ],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Product 1 description",
    arrivalDate: "2024-03-20",
    comments: mockComments,
  },
  {
    id: "2",
    name: "Product 2",
    price: 149.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
    description: "Product 2 description",
    arrivalDate: "2024-03-25",
    comments: [],
  },
];
