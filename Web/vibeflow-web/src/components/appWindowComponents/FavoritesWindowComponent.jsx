"use client";

import { useState, useEffect } from "react";
import TracksAlbumListComponent from "../TracksAlbumListComponent";

const FavoritesWindowComponent = (props) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoriteTracks = async () => { // wysyla zapytanie o ulubione utwory uzytkownika
    const s_token = localStorage.getItem("S_TOKEN");
    if (!s_token) return;
  
    const limit = 50;
    let offset = 0;
    let allTracks = [];
    let total = 0;
  
    try {
      do {
        const res = await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`, {
          headers: {
            Authorization: `Bearer ${s_token}`,
          },
          method: "GET",
        });
  
        if (res.ok) {
          const data = await res.json();
          const fetchedTracks = data.items.map(item => item.track);
          allTracks = [...allTracks, ...fetchedTracks];
          total = data.total;
          offset += limit;
        } else {
          console.error("Error fetching favorite tracks:", await res.text());
          break;
        }
      } while (offset < total);
  
      setTracks(allTracks);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const showArtist = (id) => { // pozwala na wyswietlenie danego artysty
    if (props.setCurrentPage) {
      props.setCurrentPage(`artist ${id}`);
    }
  };

  useEffect(() => {
    fetchFavoriteTracks();
  }, []);

  if (loading) { // gdy informacje nie sa zaladowane zwraca odpowiedni komunikat
    return (
      <div className="p-8 w-full text-red-500 text-center">
        Loading your favorite tracks...
      </div>
    );
  }

  return (
    <div className="p-8 w-full space-y-6">
      <h2 className="text-3xl font-bold">Your Favorite Tracks</h2>
      <TracksAlbumListComponent currentTracks={tracks} showArtist={showArtist} />
    </div>
  );
};

export default FavoritesWindowComponent;
