import { BsMusicNoteList } from "react-icons/bs";

const CurrentSongComponent = () => {
  return (
    <>
      <div className="flex items-center justify-center ml-25">
        <div>
          <BsMusicNoteList className="text-white w-15 h-15" />
        </div>
        <div className="flex flex-col items-start justify-center ml-2">
          <div className="text-white text-3xl">Tytuł utworu</div>
          <div className="text-white text-xs">Wykonawca</div>
        </div>
      </div>
    </>
  );
};

export default CurrentSongComponent;
