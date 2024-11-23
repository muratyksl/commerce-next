import { useLoading } from "@/contexts/LoadingContext";
import { useToast } from "@/components/ui/Toast";
import { handleAPIError } from "@/lib/api/errors";
import api from "@/lib/axios";

export function useApi() {
  const { setIsLoading } = useLoading();
  const { showToast } = useToast();

  const request = async <T>(
    method: string,
    url: string,
    data?: unknown,
    options: {
      showLoading?: boolean;
      showError?: boolean;
      showSuccess?: boolean;
      successMessage?: string;
    } = {}
  ): Promise<T> => {
    const {
      showLoading = true,
      showError = true,
      showSuccess = false,
      successMessage = "Operation successful",
    } = options;

    try {
      if (showLoading) {
        setIsLoading(true);
      }

      const response = await api.request({
        method,
        url,
        data,
      });

      if (showSuccess) {
        showToast(successMessage, "success");
      }

      return response.data;
    } catch (error) {
      const apiError = handleAPIError(error);

      if (showError) {
        showToast(apiError.message, "error");
      }

      throw apiError;
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  };

  return {
    get: <T>(url: string, options?: Parameters<typeof request>[3]) =>
      request<T>("GET", url, undefined, options),
    post: <T>(
      url: string,
      data: unknown,
      options?: Parameters<typeof request>[3]
    ) => request<T>("POST", url, data, options),
    put: <T>(
      url: string,
      data: unknown,
      options?: Parameters<typeof request>[3]
    ) => request<T>("PUT", url, data, options),
    delete: <T>(url: string, options?: Parameters<typeof request>[3]) =>
      request<T>("DELETE", url, undefined, options),
  };
}
