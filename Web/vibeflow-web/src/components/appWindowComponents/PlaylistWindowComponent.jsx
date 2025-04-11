"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import PlayMusicButtonComponent from "../PlayMusicButtonComponent";

const PlaylistWindowComponent = (props) => {
    
    const [currentTracks, setCurrentTracks] = useState(undefined);
    const [playlistImageUrl, setPlaylistImageUrl] = useState(undefined);
    const [playlistData, setPlaylistData] = useState(undefined);

    const token = localStorage.getItem("S_TOKEN");
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const getPlaylistData  = async () => {
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

    const generateComponent = async () => {
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
    
    if (!playlistData) {
        return (
            <div className="p-8 w-full text-center text-red-500">
                Loading artist data...
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
                <div className="rounded-lg p-4">
                    {currentTracks.map((track, index) => (
                        <div key={track.track.id} className="flex items-center py-2 border-b last:border-b-0">
                            <span className="w-8 text-gray-500">{index + 1}</span>
                            <div className="flex-1">
                                <p className="font-medium text-black">{track.track.name}</p>
                                {track.track.artists.map((artist, index) => 
                                    {
                                        if(index != track.track.artists.length-1){
                                            return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}, </span>
                                        }

                                        return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}</span>
                                    })}
                            </div>
                            <PlayMusicButtonComponent uri={track.track.uri}/>
                            <span className="text-gray-500">
                                {new Date(track.track.duration_ms).toISOString().slice(14, 19)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlaylistWindowComponent;