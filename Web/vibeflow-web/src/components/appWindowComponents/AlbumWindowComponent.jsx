"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import PlayMusicButtonComponent from "../PlayMusicButtonComponent";

const AlbumWindowComponent = (props) => {
    const [currentTracks, setCurrentTracks] = useState(undefined);
    const [albumImageUrl, setAlbumImageUrl] = useState(undefined);
    const [albumData, setAlbumData] = useState(undefined);

    const getAlbumImage = async (token) => {
        try {
            const request = await fetch(`https://api.spotify.com/v1/albums/${props.albumId}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: "GET"
            });

            if (request.ok) {
                const data = await request.json();
                const image = data.images[1];
                setAlbumImageUrl(image.url);
                setAlbumData(data);
            }
        } catch(err) {
            console.log(`Couldn't get album image | ${err}`);
        }
    };

    const generateComponent = async () => {
        const token = localStorage.getItem("S_TOKEN");
        if (!token) return;

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const request = await fetch(`https://api.spotify.com/v1/albums/${props.albumId}/tracks?limit=50`, {
                headers: headers,
                method: "GET"
            });

            if (request.ok) {
                const data = await request.json();
                setCurrentTracks(data.items);
                await getAlbumImage(token);
            }
        } catch(err) {
            console.log(`Couldn't get Album | ${err}`);
        }
    };

    const showArtist = (id) => {
        props.setCurrentPage(`artist ${id}`);
    }

    useEffect(() => {
        generateComponent();
    }, []);

    if (!albumImageUrl || !currentTracks || !albumData) {
        return (
            <div className="p-8 w-full text-center text-red-500">
                Loading album data...
            </div>
        );
    }

    return (
        <div className="p-8 w-full space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden">
                    <Image 
                        src={albumImageUrl}
                        alt={albumData.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-black">{albumData.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600">
                        {albumData.artists.map((artist) => {
                            return <span key={artist.id} className="font-semibold cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}</span>
                        })}
                        <span>•</span>
                        <span>{new Date(albumData.release_date).getFullYear()}</span>
                        <span>•</span>
                        <span>{albumData.total_tracks} songs</span>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-black">Tracks</h2>
                <div className="rounded-lg p-4">
                    {currentTracks.map((track, index) => (
                        <div key={track.id} className="flex items-center py-2 border-b last:border-b-0">
                            <span className="w-8 text-gray-500">{index + 1}</span>
                            <div className="flex-1">
                                <p className="font-medium text-black">{track.name}</p>
                                <p className="text-sm text-gray-600">
                                    {track.artists.map((artist, index) => 
                                        {
                                            if(index != track.artists.length-1){
                                                return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}, </span>
                                            }
    
                                            return <span key={artist.id} className="text-sm text-gray-600 cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}</span>
                                        })}
                                </p>
                            </div>
                            <PlayMusicButtonComponent uri={track.uri}/>
                            <span className="text-gray-500">
                                {new Date(track.duration_ms).toISOString().slice(14, 19)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlbumWindowComponent;