export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  arrivalDate: string;
  images?: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  rating: number;
  createdAt: string;
}

export interface User {
  username: string;
  token: string;
}
