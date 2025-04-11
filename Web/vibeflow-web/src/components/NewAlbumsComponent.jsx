"use client"

import { useEffect, useState } from "react";

const NewAlbumsComponent = (props) => {
    
    const [newAlbums, setNewAlbums] = useState(null);

    const getNewAlbums = async () => {
        const s_token = localStorage.getItem("S_TOKEN");
        if (!s_token) return;

        try{
            const request = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=20", {
                headers: {
                    Authorization: `Bearer ${s_token}`,
                },
                method: "GET"
            })

            if(request.ok){
                const data = await request.json();

                setNewAlbums(data.albums.items)
            }
        }catch(err){
            console.log(`Couldn't get new albums | ${err}`);
        }
    }

    useEffect(() => {
        getNewAlbums();
    }, [])

    if(newAlbums == null){
        return (
        <div className="p-8 w-full text-center text-red-500">
            Loading albums data...
        </div>)
    }

    const showAlbum = (id) => {
        props.setCurrentPage(`album ${id}`);
    }

    const showArtist = (id) => {
        props.setCurrentPage(`artist ${id}`);
    }

    return(
        <div className="shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">New Releases</h2>
            <div className="flex gap-6 overflow-x-auto p-2">
                {newAlbums.map((album) => (
                <div
                    key={album.id}
                    className="min-w-[170px] flex flex-col items-start"
                    
                >
                    <img
                    src={album.images[0].url}
                    alt={album.name}
                    className="w-50 h-50 object-cover shadow-md rounded cursor-pointer"
                    onClick={() => showAlbum(album.id)}
                    />
                    <div className="flex flex-col items-start ml-px">
                        <p className="font-bold text-sm mt-2 text-center">{album.name}</p>
                        {album.artists.map((artist, index) => 
                        {
                            if(index != album.artists.length-1){
                                return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}, </span>
                            }

                            return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}</span>
                        })}
                        <p className="text-xs text-gray-600">
                            {album.total_tracks} tracks
                        </p>
                    </div>
                    
                </div>
                ))}
            </div>
        </div>
    );
}

export default NewAlbumsComponent;