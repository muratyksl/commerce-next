export default function LoadingSpinner() {
  return (
    <div className="min-h-[400px] flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
}
