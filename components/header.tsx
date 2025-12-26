"use client"

import type React from "react"

import { Search, Video, Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCurrentUser, useLogout } from "@/lib/react-query/hooks"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const { data: currentUser, isLoading } = useCurrentUser()
  const logoutMutation = useLogout()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/")
      },
    })
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <Video className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">ViewTube</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        <form className="flex w-full max-w-2xl items-center gap-2" onSubmit={handleSearch}>
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search videos..."
              className="w-full bg-secondary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2">
        {!isLoading && currentUser ? (
          <>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.username} />
                    <AvatarFallback>{currentUser.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{currentUser.username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{currentUser.username}</span>
                    <span className="text-xs text-muted-foreground">{currentUser.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/channel/${currentUser.username}`}>Your Channel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/upload">Upload Video</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={logoutMutation.isPending}>
                  {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button asChild>
            <Link href="/auth">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
