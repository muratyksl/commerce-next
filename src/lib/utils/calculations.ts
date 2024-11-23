import { ProductComment } from "@/lib/types";

export const calculateAverageRating = (comments: ProductComment[]): number => {
  if (!comments.length) return 0;
  const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
  return Number((sum / comments.length).toFixed(1));
};
