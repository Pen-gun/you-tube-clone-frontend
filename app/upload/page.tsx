"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Video } from "lucide-react"
import { useState } from "react"

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Upload video to your backend API
    const formData = new FormData()
    if (videoFile) formData.append("video", videoFile)
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile)
    formData.append("title", title)
    formData.append("description", description)

    console.log("Uploading video:", { title, description, videoFile, thumbnailFile })
    // Example: await fetch('/api/videos/upload', { method: 'POST', body: formData })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Upload Video</CardTitle>
              <CardDescription>Share your content with the world</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="video">Video File</Label>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary p-12 transition-colors hover:border-primary">
                    <label htmlFor="video" className="cursor-pointer text-center">
                      <Video className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        {videoFile ? videoFile.name : "Click to upload video"}
                      </p>
                      <Input
                        id="video"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail (Optional)</Label>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary p-8 transition-colors hover:border-primary">
                    <label htmlFor="thumbnail" className="cursor-pointer text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        {thumbnailFile ? thumbnailFile.name : "Click to upload thumbnail"}
                      </p>
                      <Input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell viewers about your video"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="submit">Publish</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
