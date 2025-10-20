import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store";
import { play } from "../store/slices/player";
import Lesson from "./Lesson";

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

const Module = ({ title, amountOfLessons, moduleIndex }: ModuleProps) => {
  const dispatch = useAppDispatch();
  const currentModuleIndex = useAppSelector(
    (state) => state.player.currentModuleIndex,
  );
  const currentLessonIndex = useAppSelector(
    (state) => state.player.currentLessonIndex,
  );
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  const lessons = useAppSelector(
    (state) => state.player.course?.modules[moduleIndex].lessons,
  );

  const handlePlayLesson = (lessonIndex: number) => {
    dispatch(play([moduleIndex, lessonIndex]));
  };

  if (isCourseLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
          <div className="h-10 w-10 rounded-full bg-zinc-950" />

          <div className="flex flex-col gap-1 text-left">
            <div className="h-4 w-32 rounded bg-zinc-700" />
            <div className="h-3 w-20 rounded bg-zinc-700" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full cursor-pointer items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="ml-auto h-5 w-5 text-zinc-400 transition-transform group-data-[state=open]:rotate-180" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrent =
                currentModuleIndex === moduleIndex &&
                currentLessonIndex === lessonIndex;

              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  isCurrent={isCurrent}
                  onPlay={() => handlePlayLesson(lessonIndex)}
                />
              );
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default Module;
