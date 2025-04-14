import PlayMusicButtonComponent from "./PlayMusicButtonComponent"

const TracksAlbumListComponent = ({ currentTracks, showArtist }) => { // wyswietla liste utworow odpowiednio sformatowaną pod dane otrzymywane przez spotify dla albumow
    return(
        <div className="rounded-lg p-4">
            {currentTracks.map((track, index) => (
                <div key={track.id} className="flex items-center py-2 border-b last:border-b-0">
                    <span className="w-8 text-gray-500">{index + 1}</span>
                    <div className="flex-1">
                        <p className="font-medium text-black">{track.name}</p>
                        {track.artists.map((artist, index) => 
                            {
                                if(index != track.artists.length-1){
                                    return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}, </span>
                                }

                                return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}</span>
                            })
                        }
                    </div>
                    <PlayMusicButtonComponent uri={track.uri}/>
                    <span className="text-gray-500">
                        {new Date(track.duration_ms).toISOString().slice(14, 19)}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default TracksAlbumListComponent;