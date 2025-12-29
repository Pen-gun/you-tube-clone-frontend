import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function LikedVideosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold text-foreground">Liked Videos</h1>
          <p className="mt-2 text-muted-foreground">
            Videos you&apos;ve liked will be listed here once this feature is wired up.
          </p>
        </main>
      </div>
    </div>
  )
}


