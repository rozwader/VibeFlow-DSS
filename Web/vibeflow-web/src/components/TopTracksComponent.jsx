import PlayMusicButtonComponent from "./PlayMusicButtonComponent";

const TopTracksComponent = ({ topTracks, setCurrentPage }) => { // wyswietla najczesciej sluchane utworzy uzytkownika
  const showArtist = (id) => {
    setCurrentPage(`artist ${id}`);
  }
  
  return (
    <div className="shadow-md p-3 overflow-y-scroll h-90">
      <h2 className="text-xl font-semibold mb-4">Your Top Tracks</h2>
      <ul className="space-y-2">
        {topTracks.map((track) => (
          <li key={track.id} className="flex items-center justify-between gap-4 relative">
            <div className="flex flex-row gap-3">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="font-medium">{track.name}</p>
                <p className="text-sm text-gray-500">
                  {track.artists.map((artist, index) => 
                    {
                      if(index != track.artists.length-1){
                        return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}, </span>
                      }

                      return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}</span>
                    })
                  }
                </p>
                
              </div>
            </div>
            <PlayMusicButtonComponent uri={track.uri}/>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default TopTracksComponent;
