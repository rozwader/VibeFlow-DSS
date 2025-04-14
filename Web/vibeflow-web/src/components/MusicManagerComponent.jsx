"use client";
import { useEffect, useState } from "react";
import SliderComponent from "./SliderComponent";
import CurrentSongComponent from "./CurrentSongComponent";
import CurrentSongControllerComponent from "./CurrentSongControllerComponent";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

const MusicManagerComponent = (props) => {
  const [player, setPlayer] = useState(null);
  const [executed, setExecuted] = useState(false);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [currentTrackTime, setCurrentTrackTime] = useState(0);
  const [currentTrackDuration, setCurrentTrackDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (!is_paused && player) {
      interval = setInterval(() => {
        setCurrentTrackTime((prev) => {
          const newTime = prev + 1000;
          return newTime > currentTrackDuration ? currentTrackDuration : newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [is_paused, currentTrackDuration, player]);

  const handleSeek = async (newTime) => {
    try {
      if (player) {
        await player.seek(newTime);
        setCurrentTrackTime(newTime);
      }
    } catch (err) {
      console.error("Error seeking:", err);
    }
  };

  const connectToSpotify = () => {
    const newPlayer = new window.Spotify.Player({
      name: "VibeFlow",
      getOAuthToken: (cb) => cb(localStorage.getItem("S_TOKEN")),
      volume: props.volume / 100,
    });

    newPlayer.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
    });

    newPlayer.addListener("player_state_changed", (state) => {
      if (!state) return;
      
      setTrack(state.track_window.current_track);
      setPaused(state.paused);
      setCurrentTrackDuration(state.duration);
      setCurrentTrackTime(state.position);
    });

    newPlayer.connect();
    setPlayer(newPlayer);
  }

  useEffect(() => {
    if (!executed && props.connected) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        connectToSpotify();
      };

      setExecuted(true);
    }

    return () => player?.disconnect();
  }, [props.connected]);

  useEffect(() => {
    player?.setVolume(props.volume / 100);
  }, [props.volume, player]);

  return (
    <div className="w-full h-full bg-[#252525] flex flex-col relative">
      <div className="absolute top-2 left-4 flex items-center gap-2 text-gray-400">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 12L12 3V21L3 12Z" />
        </svg>
        <input
          type="range"
          min="0"
          max="100"
          value={props.volume}
          onChange={(e) => props.setVolume(Number(e.target.value))}
          className="w-52 h-1 bg-[#535353] rounded-full accent-[#ac46fe]"
        />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-6xl flex items-center justify-center px-6 gap-2">
          <CurrentSongComponent
            img={current_track.album.images[0]?.url}
            name={current_track.name}
            artists={current_track.artists}
          />

          <SliderComponent
            duration={currentTrackDuration}
            time={currentTrackTime}
            onSeek={handleSeek}
          />

          <CurrentSongControllerComponent
            entity={player}
            paused={is_paused}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicManagerComponent;