import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VideoGrid } from "@/components/video-grid"

export default function TrendingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="mb-4 text-2xl font-semibold text-foreground">Trending</h1>
          <VideoGrid params={{ limit: 20, sortBy: "views", order: "desc" }} />
        </main>
      </div>
    </div>
  )
}

