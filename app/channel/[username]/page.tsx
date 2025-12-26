"use client"

import { use } from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Header } from "@/components/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoGrid } from "@/components/video-grid"

interface ChannelPageProps {
  params: Promise<{
    username: string
  }>
}

export default function ChannelPage({ params }: ChannelPageProps) {
  const { username } = use(params)
  
  const { data: channelData, isLoading, error } = useQuery({
    queryKey: ["channel", username],
    queryFn: () => api.getUserChannelProfile(username),
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading channel...</p>
        </main>
      </div>
    )
  }

  if (error || !channelData) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-destructive">Failed to load channel</p>
        </main>
      </div>
    )
  }

  const channel = channelData.data

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end gap-6 -translate-y-12">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={channel?.avatar} />
              <AvatarFallback>{channel?.username?.[0]?.toUpperCase() || "CH"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-4">
              <h1 className="text-3xl font-bold text-foreground">{channel?.fullName || channel?.username}</h1>
              <p className="text-muted-foreground">
                @{channel?.username} • {channel?.subscribersCount || 0} subscribers
              </p>
              {channel?.description && (
                <p className="mt-2 max-w-2xl text-sm text-foreground">{channel.description}</p>
              )}
              <Button className="mt-4">Subscribe</Button>
            </div>
          </div>

          <Tabs defaultValue="videos" className="mt-6">
            <TabsList>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="videos" className="mt-6">
              <VideoGrid />
            </TabsContent>
            <TabsContent value="playlists" className="mt-6">
              <p className="text-muted-foreground">No playlists yet</p>
            </TabsContent>
            <TabsContent value="about" className="mt-6">
              <div className="max-w-2xl space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground">Description</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {channel?.description || "No description available"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Stats</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Joined: {channel?.createdAt ? new Date(channel.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground">{channel?.subscribersCount || 0} subscribers</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
