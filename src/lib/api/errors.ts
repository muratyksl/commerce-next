export class APIError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "APIError";
  }
}

export const handleAPIError = (error: unknown) => {
  if (error instanceof APIError) {
    return error;
  }

  if (error instanceof Error) {
    return new APIError(error.message, 500);
  }

  return new APIError("An unexpected error occurred", 500);
};
