"use client"

import { VideoCard } from "@/components/video-card"
import { useVideos } from "@/lib/react-query/hooks"

export function RelatedVideos({ currentVideoId }: { currentVideoId: string }) {
  const { data: videos, isLoading } = useVideos({ limit: 10, sortBy: "views", order: "desc" })

  // Filter out the current video from related videos
  const relatedVideos = videos?.videos.filter((video) => video._id !== currentVideoId).slice(0, 8)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Related Videos</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-2 animate-pulse">
              <div className="aspect-video w-40 rounded-lg bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-3 w-2/3 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!relatedVideos || relatedVideos.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Related Videos</h2>
        <p className="text-sm text-muted-foreground">No related videos found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Related Videos</h2>
      <div className="space-y-4">
        {relatedVideos.map((video) => (
          <VideoCard key={video._id} video={video} compact />
        ))}
      </div>
    </div>
  )
}
