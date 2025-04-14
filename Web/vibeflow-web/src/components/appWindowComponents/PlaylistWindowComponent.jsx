"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import PlayMusicButtonComponent from "../PlayMusicButtonComponent";
import TracksPlaylistListComponent from "../TracksPlaylistListComponent";

const PlaylistWindowComponent = (props) => {
    
    const [currentTracks, setCurrentTracks] = useState(undefined);
    const [playlistImageUrl, setPlaylistImageUrl] = useState(undefined);
    const [playlistData, setPlaylistData] = useState(undefined);

    const token = localStorage.getItem("S_TOKEN");
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const getPlaylistData  = async () => { // wysyla zapytanie o dane danej playlisty
        try{
            const request = await fetch(`https://api.spotify.com/v1/playlists/${props.playlistId}`, {
                headers: headers,
                method: "GET"
            })

            if(request.ok){
                const data = await request.json();

                setPlaylistImageUrl(data.images[0].url)
                setPlaylistData(data);
            }
        }catch(err){
            console.log(`Couldn't get playlist image | ${err}`);
        }
    }

    const generateComponent = async () => { // wysyla zapytanie o 50 utworow z danej playlisty
        try{
            const request = await fetch(`https://api.spotify.com/v1/playlists/${props.playlistId}/tracks?limit=50`, {
                headers: headers,
                method: "GET"
            })

            if(request.ok){
                const data = await request.json();

                setCurrentTracks(data.items)
                await getPlaylistData();
            }
        }catch(err){
            console.log(`Couldn't get the playlist | ${err}`);
        }
    }

    useEffect(() => {
        generateComponent();
    }, [])
    
    if (!playlistData) { // gdy informacje nie sa zaladowane zwraca odpowiedni komunikat
        return (
            <div className="p-8 w-full text-center text-red-500">
                Loading playlist data...
            </div>
        );
    }

    const showArtist = (id) => {
        props.setCurrentPage(`artist ${id}`)
    }

    return(
        <div className="p-8 w-full space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden">
                    <Image 
                        src={playlistImageUrl}
                        alt={playlistData.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-black">{playlistData.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600">
                        <span>Owner: {playlistData.owner.display_name}</span>
                        <span>•</span>
                        <span>{playlistData.tracks.total} songs</span>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-black">Tracks</h2>
                <TracksPlaylistListComponent showArtist={showArtist} currentTracks={currentTracks}/>
            </div>
        </div>
    );
}

export default PlaylistWindowComponent;