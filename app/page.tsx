import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VideoGrid } from "@/components/video-grid"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Home</h1>
          </div>
          <VideoGrid />
        </main>
      </div>
    </div>
  )
}
