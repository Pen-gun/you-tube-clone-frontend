import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import type { Video } from "@/lib/types"

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
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

  const owner = typeof video.owner === "object" ? video.owner : null

  return (
    <Link href={`/watch/${video._id}`} className="group">
      <div className="space-y-3">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
          <Image
            src={video.thumbnail || "/placeholder.svg?height=180&width=320&query=video thumbnail"}
            alt={video.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
            {formatDuration(video.duration)}
          </div>
        </div>
        <div className="flex gap-3">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarImage
              src={owner?.avatar || "/placeholder.svg?height=36&width=36&query=user avatar"}
              alt={owner?.username}
            />
            <AvatarFallback>{owner?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground group-hover:text-primary">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground">{owner?.username || "Unknown"}</p>
            <p className="text-xs text-muted-foreground">
              {formatViews(video.views)} views • {formatTimestamp(video.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
