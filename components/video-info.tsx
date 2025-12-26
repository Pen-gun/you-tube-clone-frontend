"use client"

import { ThumbsUp, ThumbsDown, Share2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import Link from "next/link"
import { useVideo, useSubscriberCount, useToggleLike, useToggleSubscription } from "@/lib/react-query/hooks"

export function VideoInfo({ videoId }: { videoId: string }) {
  const { data: video, isLoading } = useVideo(videoId)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const owner = video && typeof video.owner === "object" ? video.owner : null
  const { data: subData } = useSubscriberCount(owner?._id || "")
  const toggleLikeMutation = useToggleLike()
  const toggleSubscriptionMutation = useToggleSubscription()

  const handleLike = () => {
    toggleLikeMutation.mutate(
      { itemId: videoId, itemType: "video" },
      {
        onSuccess: () => setIsLiked(!isLiked),
      },
    )
  }

  const handleSubscribe = () => {
    if (!owner) return

    toggleSubscriptionMutation.mutate(owner._id, {
      onSuccess: () => setIsSubscribed(!isSubscribed),
    })
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  const formatSubscribers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  if (isLoading) {
    return (
      <div className="mt-4 space-y-4 animate-pulse">
        <div className="h-6 w-3/4 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </div>
    )
  }

  if (!video) return null

  return (
    <div className="mt-4 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">{video.title}</h1>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {formatViews(video.views)} views • {formatTimestamp(video.createdAt)}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={isLiked ? "default" : "secondary"}
              size="sm"
              onClick={handleLike}
              disabled={toggleLikeMutation.isPending}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="secondary" size="sm">
              <ThumbsDown className="mr-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {owner && (
        <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
          <Link href={`/channel/${owner.username}`} className="flex items-center gap-4 hover:opacity-80">
            <Avatar className="h-12 w-12">
              <AvatarImage src={owner.avatar || "/placeholder.svg"} />
              <AvatarFallback>{owner.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{owner.username}</h3>
              <p className="text-sm text-muted-foreground">
                {formatSubscribers(subData?.subscriberCount || 0)} subscribers
              </p>
            </div>
          </Link>
          <Button
            onClick={handleSubscribe}
            variant={isSubscribed ? "secondary" : "default"}
            disabled={toggleSubscriptionMutation.isPending}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>
      )}

      <div className="rounded-lg bg-secondary p-4">
        <p className="whitespace-pre-wrap text-sm text-foreground">{video.description}</p>
      </div>
    </div>
  )
}
