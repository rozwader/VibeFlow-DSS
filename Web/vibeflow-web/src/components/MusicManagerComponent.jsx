import SliderComponent from "./SliderComponent";
import CurrentSongComponent from "./CurrentSongComponent";
import CurrentSongControllerComponent from "./CurrentSongControllerComponent";

const MusicManagerComponent = () => {
  return (
    <div className="w-1/1 h-1/1 flex flex-col items-center justify-center">
      <div className=" flex items-end justify-evenly">
        <div></div>
        <div></div>
      </div>
      <div className="w-1/1 h-1/1 flex items-center justify-center">
        <CurrentSongComponent />
        <SliderComponent />
        <CurrentSongControllerComponent />
      </div>
    </div>
  );
};

export default MusicManagerComponent;
