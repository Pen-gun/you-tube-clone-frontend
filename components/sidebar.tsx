"use client"

import { Home, TrendingUp, Video, Clock, ThumbsUp, ListVideo, PlaySquare } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: TrendingUp, label: "Trending", href: "/trending" },
  { icon: Video, label: "Subscriptions", href: "/subscriptions" },
  { icon: ListVideo, label: "Library", href: "/library" },
  { icon: Clock, label: "History", href: "/history" },
  { icon: ThumbsUp, label: "Liked Videos", href: "/liked" },
  { icon: PlaySquare, label: "Playlists", href: "/playlists" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 border-r border-border bg-card lg:block">
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
