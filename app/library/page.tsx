import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { WatchHistory } from "@/components/watch-history"
import { PlaylistList } from "@/components/playlist-list"

export default function LibraryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 space-y-8 p-6">
          <WatchHistory compact />
          <PlaylistList compact />
        </main>
      </div>
    </div>
  )
}

