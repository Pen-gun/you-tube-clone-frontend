import { Header } from "@/components/header"
import { VideoPlayer } from "@/components/video-player"
import { VideoInfo } from "@/components/video-info"
import { CommentSection } from "@/components/comment-section"
import { RelatedVideos } from "@/components/related-videos"

export default function WatchPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <VideoPlayer videoId={params.id} />
            <VideoInfo videoId={params.id} />
            <CommentSection videoId={params.id} />
          </div>
          <div>
            <RelatedVideos currentVideoId={params.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
