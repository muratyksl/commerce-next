import { FiStar } from "react-icons/fi";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export default function RatingStars({
  rating,
  size = "md",
  interactive = false,
  onRatingChange,
}: RatingStarsProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          onClick={() => interactive && onRatingChange?.(star)}
          className={`${interactive ? "cursor-pointer" : "cursor-default"}`}
          data-testid={`${
            interactive ? "interactive" : "display"
          }-star-rating-${star}`}
        >
          <FiStar
            className={`
              ${sizeClasses[size]}
              ${
                star <= rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }
              transition-colors
            `}
          />
        </button>
      ))}
    </div>
  );
}
