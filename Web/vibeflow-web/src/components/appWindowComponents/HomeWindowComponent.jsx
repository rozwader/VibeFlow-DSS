"use client";

import { useState, useEffect } from "react";
import TopArtistsComponent from "../TopArtistsComponent";
import TopTracksComponent from "../TopTracksComponent";
import RecentlyPlayedComponent from "../RecentlyPlayedComponent";
import PlaylistsComponent from "../PlaylistsComponent";

const HomeWindowComponent = () => {
  const [user, setUser] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const fetchSpotifyData = async () => {
    const token = localStorage.getItem("S_TOKEN");
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const [userRes, tracksRes, artistsRes, recentRes, playlistsRes] =
        await Promise.all([
          fetch("https://api.spotify.com/v1/me", { headers }),
          fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
            headers,
          }),
          fetch("https://api.spotify.com/v1/me/top/artists?limit=5", {
            headers,
          }),
          fetch(
            "https://api.spotify.com/v1/me/player/recently-played?limit=5",
            {
              headers,
            }
          ),
          fetch("https://api.spotify.com/v1/me/playlists?limit=5", { headers }),
        ]);

      if (userRes.ok) setUser(await userRes.json());
      if (tracksRes.ok) setTopTracks((await tracksRes.json()).items);
      if (artistsRes.ok) setTopArtists((await artistsRes.json()).items);
      if (recentRes.ok) setRecentTracks((await recentRes.json()).items);
      if (playlistsRes.ok) setPlaylists((await playlistsRes.json()).items);
    } catch (error) {
      console.error("Błąd ładowania danych ze Spotify:", error);
    }
  };

  useEffect(() => {
    fetchSpotifyData();
  }, []);

  return (
    <div className="p-6 space-y-10">
      {user && (
        <div className="text-2xl font-bold text-black">
          Welcome, {user.display_name} 👋
        </div>
      )}

      <TopArtistsComponent topArtists={topArtists} />
      <TopTracksComponent topTracks={topTracks} />
      <RecentlyPlayedComponent recentTracks={recentTracks} />
      <PlaylistsComponent playlists={playlists} />
    </div>
  );
};

export default HomeWindowComponent;
