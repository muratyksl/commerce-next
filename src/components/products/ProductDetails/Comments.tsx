"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentDto, Product, ProductComment } from "@/lib/types";
import RatingStars from "@/components/products/RatingStars";
import { format } from "date-fns";
import { useApi } from "@/hooks/useApi";
import { calculateAverageRating } from "@/lib/utils/calculations";

interface CommentsProps {
  productId: string;
  comments: ProductComment[];
}

export default function Comments({ productId, comments }: CommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const api = useApi();
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: (data: CreateCommentDto) =>
      api.post(`/products/${productId}/comments`, data, {
        showSuccess: true,
        successMessage: "Comment added successfully",
      }),
    onSuccess: (newComment) => {
      queryClient.setQueryData(["product", productId], (oldData: Product) => {
        const updatedComments = [...(oldData.comments || []), newComment];
        return {
          ...oldData,
          comments: updatedComments,
          rating: calculateAverageRating(updatedComments as ProductComment[]),
        };
      });
      setNewComment("");
      setRating(0);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a rating");
      return;
    }
    if (!newComment.trim()) {
      alert("Please enter a comment");
      return;
    }
    addCommentMutation.mutate({
      text: newComment,
      rating,
      productId,
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <RatingStars
            rating={rating}
            size="lg"
            interactive
            onRatingChange={setRating}
          />
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Comment
          </label>
          <textarea
            id="comment"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your comment here..."
          />
        </div>
        <button
          type="submit"
          disabled={addCommentMutation.isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {addCommentMutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{comment.username}</span>
              <span className="text-sm text-gray-500">
                {format(new Date(comment.createdAt), "MMM d, yyyy")}
              </span>
            </div>
            <RatingStars rating={comment.rating} size="sm" />
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
