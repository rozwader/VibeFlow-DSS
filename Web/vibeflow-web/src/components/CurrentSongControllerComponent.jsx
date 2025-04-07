import { useState } from "react";
import { BsFillSkipStartFill } from "react-icons/bs";
import { BsFillSkipEndFill } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import { BsFillPauseFill } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";

const CurrentSongControllerComponent = (props) => {
  const [isMusicPlaying, switchMusicPlaying] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center mr-25">
        <BsFillSkipStartFill className="text-white w-12 h-12" onClick={() => {props.entity.previousTrack()}} />
        {!props.paused ? (
          <BsFillPauseFill
            className="text-white w-18 h-18"
            onClick={() => {props.entity.togglePlay()}}
          />
        ) : (
          <BsFillPlayFill
            className="text-white w-18 h-18"
            onClick={() => {props.entity.togglePlay()}}
          />
        )}
        <BsFillSkipEndFill className="text-white w-12 h-12" onClick={() => {props.entity.nextTrack()}} />
        <BsFillPlusCircleFill className="text-white w-9 h-9  ml-9" />
      </div>
    </>
  );
};

export default CurrentSongControllerComponent;
