"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentDto, Product, ProductComment } from "@/lib/types";
import RatingStars from "@/components/products/RatingStars";
import { format } from "date-fns";
import { useApi } from "@/hooks/useApi";
import { calculateAverageRating } from "@/lib/utils/calculations";
import CommentSkeleton from "./CommentSkeleton";
import { commentSchema, type CommentFormData } from "@/schemas/comments";

interface CommentsProps {
  productId: string;
  comments: ProductComment[];
}

export default function Comments({ productId, comments }: CommentsProps) {
  const api = useApi();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
      rating: 0,
    },
  });

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
      reset();
    },
  });

  const onSubmit = (data: CommentFormData) => {
    addCommentMutation.mutate({
      text: data.text,
      rating: data.rating,
      productId,
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <RatingStars
            rating={watch("rating")}
            size="lg"
            interactive
            onRatingChange={(value) => setValue("rating", value)}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Comment
          </label>
          <textarea
            id="text"
            {...register("text")}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.text ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Write your comment here..."
          />
          {errors.text && (
            <p className="mt-1 text-sm text-red-600">{errors.text.message}</p>
          )}
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
        {addCommentMutation.isPending ? <CommentSkeleton /> : null}
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
