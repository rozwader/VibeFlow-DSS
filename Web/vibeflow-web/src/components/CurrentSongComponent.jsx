import Image from "next/image";
import { BsMusicNoteList } from "react-icons/bs";

const CurrentSongComponent = (props) => {
  return (
    <>
      <div className="flex items-end justify-center ml-25">
        <div className="relative h-30 w-30">
          {props.img != "" ? (<img src={props.img} alt={props.name}/>) : (null)}
        </div>
        <div className="flex flex-col items-start justify-center ml-2">
          <div className="text-white text-3xl">{props.name}</div>
          <div className="text-white text-xs">{props.artists.map((x) => {
            return x.name + ","
          })}</div>
        </div>
      </div>
    </>
  );
};

export default CurrentSongComponent;
