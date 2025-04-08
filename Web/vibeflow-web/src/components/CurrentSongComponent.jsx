import Image from "next/image";
import { BsMusicNoteList } from "react-icons/bs";

const CurrentSongComponent = (props) => {
  return (
    <>
      <div className="flex items-end justify-center ml-25">
        <div className="relative h-15 w-15">
          {props.img != "" ? (<img src={props.img} alt={props.name}/>) : (null)}
        </div>
        <div className="flex flex-col items-start h-15 justify-between ml-2 max-w-[300px] min-w-[150px]">
          <div className="text-3xl font-semibold text-gray-200">{props.name}</div>
          <div className="text-gray-400 text-base">{props.artists.map((x, index) => {
            if(props.artists.length-1 == index){
              return x.name
            }
            return x.name + ", "
          })}</div>
        </div>
      </div>
    </>
  );
};

export default CurrentSongComponent;
