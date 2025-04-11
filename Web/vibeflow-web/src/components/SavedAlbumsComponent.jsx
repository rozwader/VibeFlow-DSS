"use client"

import { useEffect, useState } from "react";

const SavedAlbumsComponent = (props) => {

    const [savedAlbums, setSavedAlbums] = useState(null);

    const getSavedAlbums = async () => {
        const s_token = localStorage.getItem("S_TOKEN");
        if (!s_token) return;

        try{
            const request = await fetch("https://api.spotify.com/v1/me/albums?limit=50", {
                headers: {
                    Authorization: `Bearer ${s_token}`,
                },
                method: "GET"
            })

            if(request.ok){
                const data = await request.json();

                setSavedAlbums(data.items);
            }
        }catch(err){
            console.log(`Couldn't get saved albums | ${err}`);
        }
    }

    useEffect(() => {
        getSavedAlbums();
    }, [])

    const showAlbum = (id) => {
        props.setCurrentPage(`album ${id}`);
    }
    const showArtist = (id) => {
        props.setCurrentPage(`artist ${id}`);
    }

    if(savedAlbums == null){
        return (
            <div className="p-8 w-full text-center text-red-500">
                Loading artist data...
            </div>)
    }

    return(
        <div className="shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Saved Albums</h2>
            <div className="flex gap-6 overflow-y-auto p-2">
                {savedAlbums.map((album) => (
                <div
                    key={album.album.id}
                    className="min-w-[170px] flex flex-col items-start"
                    
                >
                    <img
                    src={album.album.images[0].url}
                    alt={album.album.name}
                    className="w-50 h-50 object-cover shadow-md rounded cursor-pointer"
                    onClick={() => showAlbum(album.album.id)}
                    />
                    <div className="flex flex-col items-start ml-px">
                        <p className="font-bold text-sm mt-2 text-center">{album.album.name}</p>
                        {album.album.artists.map((artist, index) => 
                        {
                            if(index != album.album.artists.length-1){
                                return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}, </span>
                            }

                            return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}</span>
                        })}
                        <p className="text-xs text-gray-600">
                            {album.album.total_tracks} tracks
                        </p>
                    </div>
                    
                </div>
                ))}
            </div>
        </div>
    );
}

export default SavedAlbumsComponent;