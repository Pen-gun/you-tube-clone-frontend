"use client"

import { VideoCard } from "@/components/video-card"
import { useVideos } from "@/lib/react-query/hooks"
import type { GetVideosParams } from "@/lib/types"

interface VideoGridProps {
  params?: GetVideosParams
}

export function VideoGrid({ params }: VideoGridProps) {
  const mergedParams: GetVideosParams = params ?? { limit: 20, sortBy: "createdAt", order: "desc" }
  const { data, isLoading, error } = useVideos(mergedParams)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video rounded-xl bg-muted" />
            <div className="mt-3 space-y-2">
              <div className="h-4 rounded bg-muted" />
              <div className="h-3 w-2/3 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
        <div className="text-center">
          <p className="text-lg font-medium text-foreground">Failed to load videos</p>
          <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    )
  }

  const list = (data as any)?.videos ?? data ?? []

  if (!list || list.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
        <p className="text-muted-foreground">No videos found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {list.map((video: any) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  )
}
