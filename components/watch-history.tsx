"use client"

import Link from "next/link"
import { VideoCard } from "@/components/video-card"
import { useWatchHistory } from "@/lib/react-query/hooks"

interface WatchHistoryProps {
  compact?: boolean
}

export function WatchHistory({ compact }: WatchHistoryProps) {
  const { data, isLoading, error } = useWatchHistory()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {!compact && <h1 className="text-2xl font-semibold text-foreground">History</h1>}
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
    const message = (error as Error).message || "Failed to load watch history."
    const isAuthError = message.toLowerCase().includes("unauthorized") || message.toLowerCase().includes("login")

    return (
      <div className="space-y-3">
        {!compact && <h1 className="text-2xl font-semibold text-foreground">History</h1>}
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <div className="text-center text-sm text-muted-foreground">
            {isAuthError ? (
              <>
                <p className="mb-2">Sign in to see your watch history.</p>
                <Link href="/auth" className="text-primary underline">
                  Go to sign in
                </Link>
              </>
            ) : (
              <p>{message}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  const list = data ?? []

  if (!list || list.length === 0) {
    return (
      <div className="space-y-3">
        {!compact && <h1 className="text-2xl font-semibold text-foreground">History</h1>}
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <p className="text-muted-foreground">You have not watched any videos yet.</p>
        </div>
      </div>
    )
  }

  const content = compact ? list.slice(0, 8) : list

  return (
    <div className="space-y-3">
      {!compact && <h1 className="text-2xl font-semibold text-foreground">History</h1>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {content.map((video: any) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  )
}


