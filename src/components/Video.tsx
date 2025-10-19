import Player from "react-player";
import { useAppSelector } from "../store";

const Video = () => {
  const lesson = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    const currentLesson =
      state.player.course.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ];
    return currentLesson;
  });
  return (
    <div className="aspect-video w-full bg-zinc-950">
      <Player
        width="100%"
        height="100%"
        controls
        src={`https://youtu.be/${lesson.id}`}
      />
    </div>
  );
};

export default Video;
