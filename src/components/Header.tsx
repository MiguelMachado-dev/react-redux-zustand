import { useAppSelector } from "../store";
import { useCurrentLesson } from "../store/slices/player";

const Header = () => {
  const { currentModule, currentLesson } = useCurrentLesson();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  if (isCourseLoading) {
    return (
      <div className="flex flex-col gap-1">
        <div className="h-8 w-48 animate-pulse rounded bg-zinc-700" />
        <div className="h-4 w-xs animate-pulse rounded bg-zinc-700" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">
        Módulo "{currentModule?.title}"
      </span>
    </div>
  );
};

export default Header;
