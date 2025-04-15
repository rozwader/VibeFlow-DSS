import Image from "next/image";
import { useEffect, useState } from "react";

const PlaylistsWindowComponent = ({ setCurrentPage }) => {
  const token = localStorage.getItem("S_TOKEN");
  const [playlists, setPlaylists] = useState([]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getPlaylists = async () => {// wysyla zapytanie o wszystkie playlisty uzytkownika
    try {
      const request = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
        headers: headers,
      });

      if (request.ok) {
        const data = await request.json();
        setPlaylists(data.items);
      }
    } catch (err) {
      console.log("Błąd pobierania playlist:", err);
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  const handleClick = (id) => {
    setCurrentPage(`playlist ${id}`);
  };

  return (
    <div className="p-8 w-full space-y-8">
      <h1 className="text-2xl font-bold text-black">Twoje playlisty</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick(playlist.id)}
          >
            <div className="relative aspect-square">
              <Image
                src={playlist.images[0]?.url || "/placeholder.jpg"}
                alt={playlist.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-black truncate">{playlist.name}</h3>
              <p className="text-sm text-gray-600">{playlist.tracks.total} utworów</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsWindowComponent;
