"use client"

import Link from "next/link"
import { usePlaylists } from "@/lib/react-query/hooks"
import type { Playlist } from "@/lib/types"

interface PlaylistListProps {
  compact?: boolean
}

export function PlaylistList({ compact }: PlaylistListProps) {
  const { data, isLoading, error } = usePlaylists()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {!compact && <h1 className="text-2xl font-semibold text-foreground">Playlists</h1>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4 animate-pulse">
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    const message = (error as Error).message || "Failed to load playlists."
    const isAuthError = message.toLowerCase().includes("unauthorized") || message.toLowerCase().includes("login")

    return (
      <div className="space-y-3">
        {!compact && <h1 className="text-2xl font-semibold text-foreground">Playlists</h1>}
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <div className="text-center text-sm text-muted-foreground">
            {isAuthError ? (
              <>
                <p className="mb-2">Sign in to view your playlists.</p>
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

  const list = (data as Playlist[]) ?? []

  if (!list || list.length === 0) {
    return (
      <div className="space-y-3">
        {!compact && <h1 className="text-2xl font-semibold text-foreground">Playlists</h1>}
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <p className="text-muted-foreground">You have no playlists yet.</p>
        </div>
      </div>
    )
  }

  const content = compact ? list.slice(0, 6) : list

  return (
    <div className="space-y-3">
      {!compact && <h1 className="text-2xl font-semibold text-foreground">Playlists</h1>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.map((playlist) => (
          <div key={playlist._id} className="flex flex-col justify-between rounded-lg border border-border bg-card p-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">{playlist.name}</h2>
              {playlist.description && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{playlist.description}</p>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {playlist.videos?.length ?? 0} video{(playlist.videos?.length ?? 0) === 1 ? "" : "s"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}


