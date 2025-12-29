"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useLogin, useRegister } from "@/lib/react-query/hooks"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [touched, setTouched] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const loginMutation = useLogin()
  const registerMutation = useRegister()

  // Allow deep-linking to /auth?mode=register
  useEffect(() => {
    const mode = searchParams.get("mode")
    if (mode === "register") {
      setIsLogin(false)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    setError("")

    try {
      if (isLogin) {
        loginMutation.mutate(
          { identifier: email.trim(), password },
          {
            onSuccess: () => {
              router.push("/")
            },
            onError: (err) => {
              const message = err instanceof Error ? err.message : "Unable to sign in. Please try again."
              // Normalise common auth errors into a friendly message
              if (message.toLowerCase().includes("invalid") || message.toLowerCase().includes("incorrect")) {
                setError("Email / username or password is incorrect.")
              } else {
                setError(message)
              }
            },
          },
        )
      } else {
        if (!avatar) {
          setError("Avatar is required for registration")
          return
        }

        const formData = new FormData()
        formData.append("fullName", fullName.trim())
        formData.append("username", username.trim())
        formData.append("email", email.trim())
        formData.append("password", password)
        formData.append("avatar", avatar)
        if (coverImage) {
          formData.append("coverImage", coverImage)
        }

        registerMutation.mutate(formData, {
          onSuccess: () => {
            router.push("/")
          },
          onError: (err) => {
            const message = err instanceof Error ? err.message : "Unable to create account. Please try again."
            setError(message)
          },
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed")
    }
  }

  const isLoading = loginMutation.isPending || registerMutation.isPending

  const isLoginDisabled = useMemo(() => {
    if (!isLogin) return false
    return !email.trim() || !password
  }, [email, password, isLogin])

  const isRegisterDisabled = useMemo(() => {
    if (isLogin) return false
    return !fullName.trim() || !username.trim() || !email.trim() || !password || !avatar
  }, [avatar, email, fullName, isLogin, password, username])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <Video className="h-10 w-10 text-primary" />
              <span className="text-2xl font-bold text-foreground">ViewTube</span>
            </Link>
          </div>
          <CardTitle>{isLogin ? "Sign In" : "Create Account"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your credentials to access your account"
              : "Sign up to start uploading and sharing videos"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
                  <Label htmlFor="email">{isLogin ? "Email or Username" : "Email"}</Label>
              <Input
                id="email"
                type={isLogin ? "text" : "email"}
                placeholder={isLogin ? "you@example.com or username" : "you@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar (Required)</Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image (Optional)</Label>
                  <Input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  />
                </div>
              </>
            )}
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || (touched && (isLogin ? isLoginDisabled : isRegisterDisabled))}
            >
              {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
