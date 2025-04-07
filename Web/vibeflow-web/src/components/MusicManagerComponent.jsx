"use client"

import SliderComponent from "./SliderComponent";
import CurrentSongComponent from "./CurrentSongComponent";
import CurrentSongControllerComponent from "./CurrentSongControllerComponent";
import { useEffect, useState } from "react";

const track = {
  name: "",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
}

const MusicManagerComponent = (props) => {

  const [player, setPlayer] = useState(undefined);

  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [currentTrackTime, setCurrentTruckTime] = useState("");

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const getCurrentSongTime = async () => {
    try{
      player.getCurrentState().then(state => {
        if(!state){
          console.log("User is not playing music")
        }

        const currentTrackTime = state.position;

        return millisToMinutesAndSeconds(currentTrackTime)
      })
    }catch(err){
      console.log(`Couldnt Get Current State | ${err}`)
    }
  }

  useEffect(() => {
    setCurrentTruckTime(getCurrentSongTime());
  }, [current_track, is_paused])

  useEffect(() => {
    try{
      player.setVolume(props.volume/100)
    }catch(err){
      console.log(err);
    }
    
  }, [props.volume])

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    try{
      window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(localStorage.getItem("S_TOKEN")); },
            volume: props.volume / 100
        });
  
        setPlayer(player);
  
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });
  
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
  
        player.addListener('player_state_changed', ( state => {
          console.log("STATE")
          if (!state) {
              return;
          }
      
          setTrack(state.track_window.current_track);
          setPaused(state.paused);

          player.getCurrentState().then( state => { 
              (!state)? setActive(false) : setActive(true) 
          });
      
        }));
  
        player.connect();
    
      };
    }catch(err){
      console.log(`Couldn't create music player | ${err}`)
    }
    
  }, [props.connected])

  return (
    <div className="w-1/1 h-1/1 flex flex-col items-center justify-center">
      <div className=" flex items-end justify-evenly">
        <div></div>
        <div></div>
      </div>
      <div className="w-1/1 h-1/1 flex items-center justify-center">
        <CurrentSongComponent img={current_track.album.images[0].url} name={current_track.name} artists={current_track.artists} />
        {/* <SliderComponent time={currentTrackTime}/> */}
        <CurrentSongControllerComponent entity={player} paused={is_paused} />
      </div>
    </div>
  );
};

export default MusicManagerComponent;
