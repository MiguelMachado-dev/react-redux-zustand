import Player from "react-player";
import { useAppDispatch } from "../store";
import { next, useCurrentLesson } from "../store/slices/player";

const Video = () => {
  const dispatch = useAppDispatch();

  const { currentLesson } = useCurrentLesson();

  const handlePlayNext = () => {
    dispatch(next());
  };

  if (!currentLesson) return null;

  return (
    <div className="aspect-video w-full bg-zinc-950">
      <Player
        width="100%"
        height="100%"
        controls
        playing
        onEnded={handlePlayNext}
        src={`https://youtu.be/${currentLesson.id}`}
      />
    </div>
  );
};

export default Video;
