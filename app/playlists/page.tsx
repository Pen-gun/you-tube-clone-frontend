import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { PlaylistList } from "@/components/playlist-list"

export default function PlaylistsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <PlaylistList />
        </main>
      </div>
    </div>
  )
}

