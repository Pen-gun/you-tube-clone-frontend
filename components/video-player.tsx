"use client"

import { useVideo } from "@/lib/react-query/hooks"

export function VideoPlayer({ videoId }: { videoId: string }) {
  const { data: video, isLoading } = useVideo(videoId)

  if (isLoading) {
    return <div className="aspect-video w-full animate-pulse overflow-hidden rounded-lg bg-muted" />
  }

  if (!video) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Video not found</p>
      </div>
    )
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
      <video className="h-full w-full" controls poster={video.thumbnail}>
        <source src={video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
