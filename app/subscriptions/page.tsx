import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function SubscriptionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold text-foreground">Subscriptions</h1>
          <p className="mt-2 text-muted-foreground">
            Videos from channels you&apos;re subscribed to will appear here.
          </p>
        </main>
      </div>
    </div>
  )
}


