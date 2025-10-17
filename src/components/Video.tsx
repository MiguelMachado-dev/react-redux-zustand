import Player from "react-player";

const Video = () => {
  return (
    <div className="aspect-video w-full bg-zinc-950">
      <Player
        width="100%"
        height="100%"
        controls
        src="https://www.youtube.com/embed/Mhy5_DpSDhM"
      />
    </div>
  );
};

export default Video;
