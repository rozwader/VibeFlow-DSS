import Image from "next/image";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

import { BsFillHeartFill, BsPerson } from "react-icons/bs";
import TracksAlbumListComponent from "../TracksAlbumListComponent";

const SearchWindowComponent = (props) => {
    const [queryResponse, setQueryResponse] = useState(null);

    const handleRequest = async (query) => {
        const token = localStorage.getItem("S_TOKEN");
        if (!token) return;

        const headers = {
        Authorization: `Bearer ${token}`,
        };

        try {
        const request = await fetch("/api/search/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, headers }),
        });

        if(request.ok){
            const data = await request.json();
            console.log(data.message);
            setQueryResponse(data.message);
            localStorage.setItem("lastQuery", query);
        }else{

        }
        } catch (err) {
        console.log(`Couldn't resolve query | ${err}`);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const query = formData.get("searchQuery");

        await handleRequest(query);
        
    };

    const showArtist = (id) => {
        props.setCurrentPage(`artist ${id}`);
    }

    const showAlbum = (id) => {
        props.setCurrentPage(`album ${id}`);
    }

    const showPlaylist = (id) => {
        props.setCurrentPage(`playlist ${id}`);
    }

    useEffect(() => {
        if(localStorage.getItem("lastQuery") != null){
            handleRequest(localStorage.getItem("lastQuery"));
        }
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit} className="z-[1] pb-2">
                <div className="relative w-100 shadow-md rounded-4xl">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <BsSearch />
                </div>

                <input
                    type="text"
                    name="searchQuery"
                    placeholder="What you're looking for?"
                    className="w-full py-3 pl-12 pr-28 focus:outline-none bg-white rounded-4xl"
                />

                <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 border border-black bg-black text-white px-4 py-2 rounded-4xl hover:bg-white hover:text-black transition cursor-pointer"
                >
                    Search
                </button>
                </div>
            </form>
            {queryResponse ? (<div className="mt-5 w-full flex flex-row justify-start h-[1050px]">
                {/* albums, artists, audiobooks, episodes, playlists, shows, tracks */}
                <div className="w-1/9 overflow-y-auto flex items-center flex-col gap-3">
                    {queryResponse.albums.items.map((album, index) => {
                        if(album != null && album.images[0] != null && index < 11){
                            return <div key={album.id} className="flex flex-col pb-2 shadow-md rounded-xl cursor-pointer" onClick={() => showAlbum(album.id)}>
                                <Image src={album.images[0].url} alt={album.name} width={200} height={200}
                                objectFit="cover"/>
                                <span className="font-semibold text-xl ml-2">{album.name}</span>
                                <div className="ml-2">
                                    {album.artists.map((artist) => { // mapuje sie przez wszystkich wykonawcow danego albumu po czym ich wyswietla
                                        return <span key={artist.id} className="font-semibold cursor-pointer" onClick={() => showArtist(artist.id)}>{artist.name}</span>
                                    })}
                                </div>
                            </div>
                        }
                    })}
                </div>
                <div className="w-1/9 overflow-y-auto flex items-center flex-col gap-3"> 
                    {queryResponse.artists.items.map((artist, index) => {
                        if(artist != null && artist.images[0] != null && index < 11){
                            return <div key={artist.id} className="flex flex-col pb-2 shadow-md cursor-pointer" onClick={() => showArtist(artist.id)}>
                                <Image src={artist.images[0].url} alt={artist.name} width={200} height={200} objectFit="cover"/>
                                <span className="font-semibold text-xl ml-2">{artist.name}</span>
                                <span className="font-semibold text-md ml-2 flex flex-row items-center gap-1"><BsPerson />{artist.followers.total} </span>
                            </div>
                        }
                    })}
                </div>
                <div className="w-1/7 overflow-y-auto flex items-center flex-col gap-3"> 
                    {queryResponse.playlists.items.map((playlist, index) => {
                        if(playlist != null && playlist.images[0] != null && index < 11){
                            return <div key={playlist.id} className="flex w-full flex-col p-2 shadow-md cursor-pointer" onClick={() => showPlaylist(playlist.id)}>
                                <div className="w-full h-75 overflow-hidden flex items-center justify-center">
                                    <Image src={playlist.images[0].url} alt={playlist.name} className="w-full" width={200} height={200} objectFit="cover"/>
                                </div>
                                <span className="font-semibold text-xl ml-2">{playlist.name}</span>
                            </div>
                        }
                        
                    })}
                </div>
                <div className="w-5/8 overflow-y-scroll"> 
                    <TracksAlbumListComponent currentTracks={queryResponse.tracks.items} showArtist={showArtist}/>
                </div>
            </div>) : (null)}
        </div>
    );
}

export default SearchWindowComponent;