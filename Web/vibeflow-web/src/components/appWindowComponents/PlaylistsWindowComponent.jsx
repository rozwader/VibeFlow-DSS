"use client";

import { useState, useEffect } from "react";

const PlaylistsWindowComponent = () => {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => { // wysyla zapytanie o wszystkie playlisty uzytkownika
    const s_token = localStorage.getItem("S_TOKEN");
    if (!s_token) return;

    const res = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${s_token}`,
      },
      method: "GET",
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

  return (
    <div className="p-4">
    <h2 className="text-xl font-semibold mb-4 text-white">Your Playlists</h2>
    <div className="flex overflow-x-auto gap-4 pb-4">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="flex-shrink-0 w-40">
          <div className="bg-[#181818] p-3 rounded">
            <img
              src={playlist.images[0]?.url || '/default-playlist.png'}
              className="w-full aspect-square object-cover mb-2 rounded"
              alt={playlist.name}
            />
            <p className="text-white font-medium truncate text-sm">{playlist.name}</p>
            <p className="text-gray-400 text-xs">{playlist.tracks.total} tracks</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default PlaylistsWindowComponent;
