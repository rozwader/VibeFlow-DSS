"use client"

import { useState, useEffect } from "react";

const PlaylistWindowComponent = () => {

    const [playlists, setPlaylists] = useState([]);

    const fetchPlaylists = async () => {
    const s_token = localStorage.getItem("S_TOKEN");
    if (!s_token) return;
    
        const res = await fetch("https://api.spotify.com/v1/me/playlists", {
            headers: {
            Authorization: `Bearer ${s_token}`,
            },
            method: "GET"
        });
    
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            setPlaylists(data.items);
        } else {
            console.error("Błąd pobierania playlist:", await res.text());
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return(
        <div className="absolute top-[60px] left-[10px]">
        <h2 className="font-bold">Twoje Playlisty:</h2>
        <ul className="flex flex-row">
          {playlists.map((playlist) => (
            
            <li key={playlist.id}>
              <img
                src={playlist.images[0].url}
                className="h-48 w-96 object-contain"
                alt="Playlist-Art"
              />
              <p className="font-semibold">{playlist.name}</p>
              <p className="text-sm">{playlist.tracks.total} utworów</p>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default PlaylistWindowComponent;
