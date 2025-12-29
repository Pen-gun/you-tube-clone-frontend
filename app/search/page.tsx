import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <SearchResults />
        </main>
      </div>
    </div>
  )
}


