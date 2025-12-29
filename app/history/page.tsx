import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { WatchHistory } from "@/components/watch-history"

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <WatchHistory />
        </main>
      </div>
    </div>
  )
}

