import { Loader } from "lucide-react";
import Player from "react-player";
import { useAppDispatch, useAppSelector } from "../store";
import { next, useCurrentLesson } from "../store/slices/player";

const Video = () => {
  const dispatch = useAppDispatch();
  const { currentLesson } = useCurrentLesson();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  const handlePlayNext = () => {
    dispatch(next());
  };

  return (
    <div className="aspect-video w-full bg-zinc-950">
      {isCourseLoading ? (
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
          src={`https://youtu.be/${currentLesson?.id}`}
        />
      )}
    </div>
  );
};

export default Video;
