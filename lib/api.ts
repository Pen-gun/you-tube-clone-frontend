import { axiosInstance } from "./axios"
import type { Video, Comment, User, Playlist, Tweet, GetVideosParams, ApiResponse } from "./types"

export const api = {
  // ========== USER / AUTH ENDPOINTS ==========

  async register(formData: FormData) {
    const { data } = await axiosInstance.post<ApiResponse<User>>("/users/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return data
  },

  async login(identifier: string, password: string) {
    const { data } = await axiosInstance.post<ApiResponse<User>>("/users/login", {
      email: identifier.includes("@") ? identifier : undefined,
      username: !identifier.includes("@") ? identifier : undefined,
      password,
    })
    return data
  },

  async logout() {
    const { data } = await axiosInstance.post<ApiResponse<null>>("/users/logout")
    return data
  },

  async refreshToken() {
    const { data } = await axiosInstance.post<ApiResponse<{ accessToken: string }>>("/users/refresh-token")
    return data
  },

  async getCurrentUser() {
    const { data } = await axiosInstance.get<ApiResponse<User>>("/users/me")
    console.log("Current user data:", data)
    return data
  },

  async changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    const { data } = await axiosInstance.post<ApiResponse<null>>("/users/change-password", {
      oldPassword,
      newPassword,
      confirmPassword,
    })
    return data
  },

  async updateAccount(updateData: { fullName?: string; username?: string; email?: string }) {
    const { data } = await axiosInstance.patch<ApiResponse<User>>("/users/update-account", updateData)
    return data
  },

  async updateAvatar(formData: FormData) {
    const { data } = await axiosInstance.patch<ApiResponse<User>>("/users/update-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return data
  },

  async updateCoverImage(formData: FormData) {
    const { data } = await axiosInstance.patch<ApiResponse<User>>("/users/update-cover-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return data
  },

  async getUserChannelProfile(username: string) {
    const { data } = await axiosInstance.get<ApiResponse<any>>(`/users/get-user-channel-profile/${username}`)
    return data
  },

  async getWatchHistory() {
    const { data } = await axiosInstance.get<ApiResponse<Video[]>>("/users/get-watch-history")
    return data
  },

  // ========== VIDEO ENDPOINTS ==========

  async getVideos(params?: GetVideosParams) {
    const { data } = await axiosInstance.get<ApiResponse<Video[]>>("/videos", { params })
    return data
  },

  async uploadVideo(formData: FormData) {
    const { data } = await axiosInstance.post<ApiResponse<Video>>("/videos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return data
  },

  async getVideoById(videoId: string) {
    const { data } = await axiosInstance.get<ApiResponse<Video>>(`/videos/${videoId}`)
    return data
  },

  async deleteVideo(videoId: string) {
    const { data } = await axiosInstance.delete<ApiResponse<null>>(`/videos/${videoId}`)
    return data
  },

  async togglePublishStatus(videoId: string) {
    const { data } = await axiosInstance.patch<ApiResponse<Video>>(`/videos/${videoId}`)
    return data
  },

  async updateVideo(videoId: string, formData: FormData) {
    const { data } = await axiosInstance.patch<ApiResponse<Video>>(`/videos/update-video/${videoId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return data
  },

  // ========== COMMENT ENDPOINTS ==========

  async getComments(videoId: string) {
    const { data } = await axiosInstance.get<ApiResponse<Comment[]>>(`/comment/${videoId}`)
    return data
  },

  async addComment(videoId: string, comment: string) {
    const { data } = await axiosInstance.post<ApiResponse<Comment>>(`/comment/${videoId}`, { comment })
    return data
  },

  async deleteComment(commentId: string) {
    const { data } = await axiosInstance.delete<ApiResponse<null>>(`/comment/${commentId}`)
    return data
  },

  async updateComment(commentId: string, content: string) {
    const { data } = await axiosInstance.patch<ApiResponse<Comment>>(`/comment/${commentId}`, { content })
    return data
  },

  // ========== LIKE ENDPOINTS ==========

  async toggleLike(itemId: string, itemType: "comment" | "video" | "tweet") {
    const { data } = await axiosInstance.post<ApiResponse<any>>("/likes", { itemId, itemType })
    return data
  },

  async getLikes(itemId: string, itemType: "comment" | "video" | "tweet") {
    const { data } = await axiosInstance.get<ApiResponse<any>>("/likes", {
      params: { itemId, itemType },
    })
    return data
  },

  // ========== SUBSCRIPTION ENDPOINTS ==========

  async toggleSubscription(channelId: string) {
    const { data } = await axiosInstance.post<ApiResponse<any>>(`/subscriptions/${channelId}`)
    return data
  },

  async getSubscriberCount(channelId: string) {
    const { data } = await axiosInstance.get<ApiResponse<{ subscriberCount: number }>>(`/subscriptions/${channelId}`)
    return data
  },

  // ========== PLAYLIST ENDPOINTS ==========

  async getPlaylist(playlistId: string) {
    const { data } = await axiosInstance.get<ApiResponse<Playlist>>(`/playlists/${playlistId}`)
    return data
  },

  async getPlaylists() {
    const { data } = await axiosInstance.get<ApiResponse<Playlist[]>>("/playlists")
    return data
  },

  async getUserPlaylists(userId: string) {
    const { data } = await axiosInstance.get<ApiResponse<Playlist[]>>(`/playlists/user/${userId}`)
    return data
  },

  async addVideoToPlaylist(videoId: string, playlistId: string) {
    const { data } = await axiosInstance.put<ApiResponse<Playlist>>(`/playlists/${videoId}`, { playlistId })
    return data
  },

  async removeVideoFromPlaylist(videoId: string, playlistId: string) {
    const { data } = await axiosInstance.delete<ApiResponse<Playlist>>(`/playlists/${videoId}`, {
      data: { playlistId },
    })
    return data
  },

  async deletePlaylist(playlistId: string) {
    const { data } = await axiosInstance.delete<ApiResponse<null>>(`/playlists/d/${playlistId}`)
    return data
  },

  async createPlaylist(name: string, description: string) {
    const { data } = await axiosInstance.post<ApiResponse<Playlist>>("/playlists", { name, description })
    return data
  },

  // ========== TWEET ENDPOINTS ==========

  async createTweet(content: string) {
    const { data } = await axiosInstance.post<ApiResponse<Tweet>>("/tweets", { content })
    return data
  },

  async getUserTweets(userId: string) {
    const { data } = await axiosInstance.get<ApiResponse<Tweet[]>>(`/tweets/${userId}`)
    return data
  },

  async deleteTweet(tweetId: string) {
    const { data } = await axiosInstance.delete<ApiResponse<null>>(`/tweets/${tweetId}`)
    return data
  },

  async updateTweet(tweetId: string, content: string) {
    const { data } = await axiosInstance.put<ApiResponse<Tweet>>(`/tweets/${tweetId}`, { content })
    return data
  },
}
