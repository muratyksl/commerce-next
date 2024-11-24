interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullHeight?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  fullHeight = true,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`flex justify-center items-center ${
        fullHeight ? "min-h-[400px]" : ""
      }`}
    >
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}
      />
    </div>
  );
}
