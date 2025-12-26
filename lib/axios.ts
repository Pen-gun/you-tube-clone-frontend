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

// Track a single in-flight refresh to avoid stampede requests
let refreshPromise: Promise<any> | null = null

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
    const originalRequest = error.config || {}

    // Avoid retrying refresh endpoint and handle 401 once per request
    const isRefreshEndpoint = typeof originalRequest.url === "string" && originalRequest.url.includes("/users/refresh-token")

    if (error.response?.status === 401 && !isRefreshEndpoint && !originalRequest._retry) {
      try {
        if (!refreshPromise) {
          // Kick off a single refresh request shared by all waiters
          refreshPromise = axiosInstance.post("/users/refresh-token").finally(() => {
            refreshPromise = null
          })
        }

        await refreshPromise

        // Mark so we do not loop forever if it still fails
        originalRequest._retry = true
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          // Redirect to login on refresh failure
        }
        return Promise.reject(refreshError)
      }
    }

    // Extract error message from API response
    const message = error.response?.data?.message || error.message || "An error occurred"
    return Promise.reject(new Error(message))
  },
)
