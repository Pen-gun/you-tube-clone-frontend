import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Response interceptor to handle API responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Extract data from the ApiResponse structure
    if (response.data && response.data.success) {
      return { ...response, data: response.data.data }
    }
    return response
  },
  async (error) => {
    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401) {
      try {
        // Try to refresh token
        await axiosInstance.post("/users/refresh-token")
        // Retry the original request
        return axiosInstance(error.config)
      } catch (refreshError) {
        // Refresh failed, redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/auth"
        }
        return Promise.reject(refreshError)
      }
    }

    // Extract error message from API response
    const message = error.response?.data?.message || error.message || "An error occurred"
    return Promise.reject(new Error(message))
  },
)
