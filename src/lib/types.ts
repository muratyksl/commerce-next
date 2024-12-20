export interface ProductComment {
  id: string;
  productId: string;
  userId: string;
  username: string;
  text: string;
  rating: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  arrivalDate: string;
  images?: string[];
  comments: ProductComment[];
}

export interface User {
  username: string;
  token: string;
}

export interface CreateCommentDto {
  text: string;
  rating: number;
  productId: string;
}
