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

  useEffect(() => {
    const token = localStorage.getItem("S_TOKEN");
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchUser = async () => {
      const res = await fetch("https://api.spotify.com/v1/me", { headers });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        console.error("Błąd pobierania użytkownika:", await res.text());
      }
    };

    const fetchTopTracks = async () => {
      const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", { headers });
      if (res.ok) {
        const data = await res.json();
        setTopTracks(data.items);
      } else {
        console.error("Błąd pobierania top tracks:", await res.text());
      }
    };

    const fetchTopArtists = async () => {
      const res = await fetch("https://api.spotify.com/v1/me/top/artists?limit=5", { headers });
      if (res.ok) {
        const data = await res.json();
        setTopArtists(data.items);
      } else {
        console.error("Błąd pobierania top artists:", await res.text());
      }
    };

    const fetchRecentTracks = async () => {
      const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=5", { headers });
      if (res.ok) {
        const data = await res.json();
        setRecentTracks(data.items);
      } else {
        console.error("Błąd pobierania recently played:", await res.text());
      }
    };

    const fetchPlaylists = async () => {
      const res = await fetch("https://api.spotify.com/v1/me/playlists?limit=5", { headers });
      if (res.ok) {
        const data = await res.json();
        setPlaylists(data.items);
      } else {
        console.error("Błąd pobierania playlist:", await res.text());
      }
    };

    fetchUser();
    fetchTopTracks();
    fetchTopArtists();
    fetchRecentTracks();
    fetchPlaylists();
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
