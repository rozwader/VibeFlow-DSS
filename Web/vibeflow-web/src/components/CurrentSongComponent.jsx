const CurrentSongComponent = (props) => {
  return (
    <div className="flex items-center gap-4 min-w-[300px]">
      <div className="relative h-16 w-16 min-w-[64px] overflow-hidden rounded">
        {props.img ? (
          <img src={props.img} alt={props.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 text-2xl">🎵</span>
          </div>
        )}
      </div>
      <div className="overflow-hidden">
        <div className="text-white font-medium truncate">{props.name || "No track playing"}</div>
        <div className="text-gray-400 text-sm truncate">
          {props.artists?.map((artist, i) => (
            <span key={i}>
              {artist.name}
              {i < props.artists.length - 1 ? ", " : ""}
            </span>
          )) || "Unknown artist"}
        </div>
      </div>
    </div>
  );
};

export default CurrentSongComponent;