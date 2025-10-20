import { Loader } from "lucide-react";
import Player from "react-player";
import { useCurrentLesson, useStore } from "../zustand-store";

const Video = () => {
  const { currentLesson } = useCurrentLesson();
  const isLoading = useStore((s) => s.isLoading);
  const next = useStore((s) => s.next);

  const handlePlayNext = () => {
    next();
  };

  return (
    <div className="aspect-video w-full bg-zinc-950">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      ) : (
        <Player
          width="100%"
          height="100%"
          controls
          playing
          onEnded={handlePlayNext}
          src={
            currentLesson ? `https://youtu.be/${currentLesson.id}` : undefined
          }
        />
      )}
    </div>
  );
};

export default Video;
