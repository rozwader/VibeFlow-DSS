import PlayMusicButtonComponent from "./PlayMusicButtonComponent";

const RecentlyPlayedComponent = ({ recentTracks, setCurrentPage }) => {
  const showArtist = (id) => {
    setCurrentPage(`artist ${id}`);
  }

  if(recentTracks == []){
    return (
      <div className="p-8 w-full text-center text-red-500">
        Loading tracks data...
      </div>
    );
  }

  let i = 0;

  return (
    <div className="shadow-md p-3 overflow-y-scroll h-90">
      <h2 className="text-xl font-semibold mb-4">Recently Played Tracks</h2>
      <ul className="space-y-2">
        {recentTracks.map((track) => (
          <li key={i++} className="flex items-center justify-between gap-4 relative">
            <div className="flex flex-row gap-3">
              <img
                src={track.track.album.images[0]?.url}
                alt={track.track.name}
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="font-medium">{track.track.name}</p>
                <p className="text-sm text-gray-500">
                  {track.track.artists.map((artist, index) => 
                    {
                      if(index != track.track.artists.length-1){
                        return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}, </span>
                      }

                      return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}</span>
                    })
                  }
                </p>
                
              </div>
            </div>
            <PlayMusicButtonComponent uri={track.track.uri}/>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default RecentlyPlayedComponent;
