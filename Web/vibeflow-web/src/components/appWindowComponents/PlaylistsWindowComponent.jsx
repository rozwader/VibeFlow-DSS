"use client";

import { useState, useEffect } from "react";

const PlaylistsWindowComponent = () => {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
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
    <div className="absolute top-25 left-6 flex flex-col gap-4 w-full px-4">
      <h2 className="text-black text-xl font-semibold mb-2">Your playlists</h2>

      <ul className="grid grid-cols-5 gap-6 w-full">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="flex flex-col items-start space-y-2">
            <img
              src={playlist.images[0]?.url}
              className="h-48 w-48 object-cover rounded-lg shadow-md"
              alt={`Okładka ${playlist.name}`}
            />
            <p className="font-semibold text-base truncate max-w-[12rem]">
              {playlist.name}
            </p>
            <p className="text-sm text-gray-700">
              {playlist.tracks.total} tracks
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistsWindowComponent;
