"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const ArtistWindowComponent = (props) => {
    const token = localStorage.getItem("S_TOKEN");
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [currentArtist, setCurrentArtist] = useState(null); 
    const [currentAlbums, setCurrentAlbums] = useState([]);

    const getArtistAlbums = async (artistId) => {
        try {
            const request = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=15&include_groups=album,single,compilation`, {
                headers: headers,
                method: "GET"
            });

            if(request.ok){
                const data = await request.json();
                setCurrentAlbums(data.items);
            }
        } catch(err) {
            console.log(`Couldn't get artist albums | ${err}`);
        }
    };

    const getArtist = async () => {
        try {
            const request = await fetch(`https://api.spotify.com/v1/artists/${props.artistId}`, {
                method: "GET",
                headers: headers
            });

            if(request.ok){
                const data = await request.json();
                setCurrentArtist(data);
                await getArtistAlbums(data.id);
            }
        } catch(err) {
            console.log(`Couldn't get the Artist | ${err}`);
        }
    };
    
    useEffect(() => {
        getArtist();
    }, []);

    const handleClick = (id) => {
        props.setCurrentPage(`album ${id}`)
    }

    if (!currentArtist) {
        return (
            <div className="p-8 w-full text-center text-red-500">
                Loading artist data...
            </div>
        );
    }

    return(
        <div className="p-8 w-full space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
                    <Image 
                        src={currentArtist.images[1].url} 
                        alt={currentArtist.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-black">{currentArtist.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600">
                        <span className="font-semibold">{currentArtist.followers.total.toLocaleString()} followers</span>
                        <span>•</span>
                        <span>Popularity: {currentArtist.popularity}%</span>
                    </div>
                    {currentArtist.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {currentArtist.genres.map((genre, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-800">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-black">Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {currentAlbums.map((album) => (
                        <div key={album.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => handleClick(album.id)}>
                            <div className="relative aspect-square">
                                <Image
                                    src={album.images[1].url}
                                    alt={album.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="font-semibold text-black truncate">{album.name}</h3>
                                <p className="text-sm text-gray-600">{new Date(album.release_date).getFullYear()}</p>
                                <p className="text-sm text-gray-600">{album.total_tracks} tracks</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArtistWindowComponent;