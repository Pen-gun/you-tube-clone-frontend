"use client"

import { useSearchParams } from "next/navigation"
import { VideoCard } from "@/components/video-card"
import { useVideos } from "@/lib/react-query/hooks"

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const { data: videos, isLoading, error } = useVideos(
    query
      ? {
          query,
          limit: 20,
          sortBy: "createdAt",
          order: "desc",
        }
      : {
          limit: 20,
          sortBy: "createdAt",
          order: "desc",
        },
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>
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
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <div className="text-center">
            <p className="text-lg font-medium text-foreground">Failed to load search results</p>
            <p className="mt-1 text-sm text-muted-foreground">{(error as Error).message}</p>
          </div>
        </div>
      </div>
    )
  }

  const list = (videos as any)?.videos ?? videos ?? []

  if (!list || list.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <p className="text-muted-foreground">No videos found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-foreground">
        {query ? `Search results for "${query}"` : "Search"}
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((video: any) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  )
}


