import { Header } from "@/components/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoGrid } from "@/components/video-grid"

export default function ChannelPage() {
  // TODO: Fetch channel data from your backend API

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end gap-6 -translate-y-12">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src="/winding-waterway.png" />
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-4">
              <h1 className="text-3xl font-bold text-foreground">Tech Academy</h1>
              <p className="text-muted-foreground">@techacademy • 500K subscribers</p>
              <p className="mt-2 max-w-2xl text-sm text-foreground">
                Learn coding, web development, and software engineering. New tutorials every week!
              </p>
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
                    Welcome to Tech Academy! We create high-quality programming tutorials and coding courses for
                    developers of all skill levels.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Stats</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Joined: Jan 2020</p>
                  <p className="text-sm text-muted-foreground">1.2M total views</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
