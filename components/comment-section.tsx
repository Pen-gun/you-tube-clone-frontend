"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MoreVertical } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useComments, useAddComment, useDeleteComment, useToggleLike, useCurrentUser } from "@/lib/react-query/hooks"

export function CommentSection({ videoId }: { videoId: string }) {
  const [newComment, setNewComment] = useState("")

  const { data: comments, isLoading } = useComments(videoId)
  const { data: currentUser } = useCurrentUser()
  const addCommentMutation = useAddComment()
  const deleteCommentMutation = useDeleteComment()
  const toggleLikeMutation = useToggleLike()

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    addCommentMutation.mutate(
      { videoId, comment: newComment },
      {
        onSuccess: () => {
          setNewComment("")
        },
      },
    )
  }

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutation.mutate({ commentId, videoId })
  }

  const handleLikeComment = (commentId: string) => {
    toggleLikeMutation.mutate({ itemId: commentId, itemType: "comment" })
  }

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  if (isLoading) {
    return (
      <div className="mt-6 space-y-4">
        <div className="h-6 w-32 rounded bg-muted animate-pulse" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                <div className="h-12 w-full rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{comments?.length || 0} Comments</h2>

      {currentUser && (
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
            <AvatarFallback>{currentUser.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setNewComment("")}>
                Cancel
              </Button>
              <Button onClick={handleSubmitComment} disabled={addCommentMutation.isPending}>
                {addCommentMutation.isPending ? "Posting..." : "Comment"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {comments?.map((comment) => (
          <div key={comment._id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.owner.avatar || "/placeholder.svg?height=40&width=40&query=user avatar"} />
              <AvatarFallback>{comment.owner.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{comment.owner.username}</span>
                  <span className="text-xs text-muted-foreground">{formatTimestamp(comment.createdAt)}</span>
                  {currentUser && currentUser._id === comment.owner._id && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDeleteComment(comment._id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <p className="mt-1 text-sm text-foreground">{comment.content}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLikeComment(comment._id)}
                  disabled={toggleLikeMutation.isPending}
                >
                  <ThumbsUp className="mr-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
