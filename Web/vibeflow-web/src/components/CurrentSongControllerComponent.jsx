import {
  BsFillSkipStartFill,
  BsFillSkipEndFill,
  BsFillPlayFill,
  BsFillPauseFill,
} from "react-icons/bs";

const CurrentSongControllerComponent = (props) => {
  return (
    <div className="flex items-center justify-center gap-6 min-w-[200px]">
      <button
        onClick={() => props.entity?.previousTrack()}
        className="text-gray-300 hover:text-white transition-colors"
      >
        <BsFillSkipStartFill className="w-6 h-6" />
      </button>
      <button
        onClick={() => props.entity?.togglePlay()}
        className="bg-white rounded-full p-3 hover:scale-105 transition-transform"
      >
        {props.paused ? (
          <BsFillPlayFill className="w-6 h-6 text-black" />
        ) : (
          <BsFillPauseFill className="w-6 h-6 text-black" />
        )}
      </button>
      <button
        onClick={() => props.entity?.nextTrack()}
        className="text-gray-300 hover:text-white transition-colors"
      >
        <BsFillSkipEndFill className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CurrentSongControllerComponent;
