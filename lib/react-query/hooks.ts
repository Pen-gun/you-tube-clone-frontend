import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../api"
import type { GetVideosParams } from "../types"

// ========== VIDEO HOOKS ==========

export function useVideos(params?: GetVideosParams) {
  return useQuery({
    queryKey: ["videos", params],
    queryFn: () => api.getVideos(params),
  })
}

export function useVideo(videoId: string) {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => api.getVideoById(videoId),
    enabled: !!videoId,
  })
}

export function useUploadVideo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => api.uploadVideo(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })
}

export function useDeleteVideo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (videoId: string) => api.deleteVideo(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })
}

export function useUpdateVideo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ videoId, formData }: { videoId: string; formData: FormData }) => api.updateVideo(videoId, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["video", variables.videoId] })
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })
}

// ========== COMMENT HOOKS ==========

export function useComments(videoId: string) {
  return useQuery({
    queryKey: ["comments", videoId],
    queryFn: () => api.getComments(videoId),
    enabled: !!videoId,
  })
}

export function useAddComment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ videoId, comment }: { videoId: string; comment: string }) => api.addComment(videoId, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.videoId] })
    },
  })
}

export function useDeleteComment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ commentId, videoId }: { commentId: string; videoId: string }) => api.deleteComment(commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.videoId] })
    },
  })
}

export function useUpdateComment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ commentId, content, videoId }: { commentId: string; content: string; videoId: string }) =>
      api.updateComment(commentId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.videoId] })
    },
  })
}

// ========== LIKE HOOKS ==========

export function useToggleLike() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ itemId, itemType }: { itemId: string; itemType: "comment" | "video" | "tweet" }) =>
      api.toggleLike(itemId, itemType),
    onSuccess: (_, variables) => {
      if (variables.itemType === "video") {
        queryClient.invalidateQueries({ queryKey: ["video", variables.itemId] })
      } else if (variables.itemType === "comment") {
        queryClient.invalidateQueries({ queryKey: ["comments"] })
      }
    },
  })
}

// ========== USER / AUTH HOOKS ==========

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => api.getCurrentUser(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ identifier, password }: { identifier: string; password: string }) => api.login(identifier, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => api.register(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.logout(),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export function useUserChannelProfile(username: string) {
  return useQuery({
    queryKey: ["channel", username],
    queryFn: () => api.getUserChannelProfile(username),
    enabled: !!username,
  })
}

export function useWatchHistory() {
  return useQuery({
    queryKey: ["watchHistory"],
    queryFn: () => api.getWatchHistory(),
  })
}

// ========== SUBSCRIPTION HOOKS ==========

export function useToggleSubscription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (channelId: string) => api.toggleSubscription(channelId),
    onSuccess: (_, channelId) => {
      queryClient.invalidateQueries({ queryKey: ["channel"] })
      queryClient.invalidateQueries({ queryKey: ["video"] })
    },
  })
}

export function useSubscriberCount(channelId: string) {
  return useQuery({
    queryKey: ["subscriberCount", channelId],
    queryFn: () => api.getSubscriberCount(channelId),
    enabled: !!channelId,
  })
}

// ========== PLAYLIST HOOKS ==========

export function usePlaylist(playlistId: string) {
  return useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => api.getPlaylist(playlistId),
    enabled: !!playlistId,
  })
}

export function usePlaylists() {
  return useQuery({
    queryKey: ["playlists"],
    queryFn: () => api.getPlaylists(),
  })
}

export function useUserPlaylists(userId: string) {
  return useQuery({
    queryKey: ["playlists", userId],
    queryFn: () => api.getUserPlaylists(userId),
    enabled: !!userId,
  })
}

export function useCreatePlaylist() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, description }: { name: string; description: string }) => api.createPlaylist(name, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] })
    },
  })
}

export function useDeletePlaylist() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (playlistId: string) => api.deletePlaylist(playlistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] })
    },
  })
}

// ========== TWEET HOOKS ==========

export function useUserTweets(userId: string) {
  return useQuery({
    queryKey: ["tweets", userId],
    queryFn: () => api.getUserTweets(userId),
    enabled: !!userId,
  })
}

export function useCreateTweet() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (content: string) => api.createTweet(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] })
    },
  })
}

export function useDeleteTweet() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ tweetId, userId }: { tweetId: string; userId: string }) => api.deleteTweet(tweetId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tweets", variables.userId] })
    },
  })
}

export function useUpdateTweet() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ tweetId, content, userId }: { tweetId: string; content: string; userId: string }) =>
      api.updateTweet(tweetId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tweets", variables.userId] })
    },
  })
}
