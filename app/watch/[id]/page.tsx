import { Header } from "@/components/header"
import { VideoPlayer } from "@/components/video-player"
import { VideoInfo } from "@/components/video-info"
import { CommentSection } from "@/components/comment-section"
import { RelatedVideos } from "@/components/related-videos"
import { promises } from "dns"

export default async function WatchPage({ params }: { params: Promise<{id:string}> }) {
  const {id} = await params;
  console.log("Video ID:", id);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            
            <VideoPlayer videoId={id} />
            <VideoInfo videoId={id} /> 
            <CommentSection videoId={id} />
          </div>
          <div>
            <RelatedVideos currentVideoId={id} />
          </div>
        </div>
      </main>
    </div>
  )
}
