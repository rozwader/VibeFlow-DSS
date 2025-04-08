"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBarComponent from "@/components/SideBarComponent";
import AppWindowComponent from "@/components/AppWindowComponent";
import MusicManagerComponent from "@/components/MusicManagerComponent";
import SearchComponent from "@/components/SearchComponent";
import PlaylistsWindowComponent from "@/components/appWindowComponents/PlaylistsWindowComponent";
import HomeWindowComponent from "@/components/appWindowComponents/HomeWindowComponent";

const musicPage = () => {
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);

  // lista stron
  // settings, albums, favorites, playlist, addplaylist, addsong

  const pageComponents = {
    playlists: <PlaylistsWindowComponent />,
    home: <HomeWindowComponent />,
  };

  const [currentPage, setCurrentPage] = useState("");

  const returnPage = () => {
    return pageComponents[currentPage];
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  const checkToken = async () => {
    const token = localStorage.getItem("TOKEN");
    try {
      const request = await fetch("/api/auth/tokencheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await request.json();
      console.log(data);

      if (!request.ok) {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("User");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("TOKEN") != null) {
      checkToken();
    } else {
      router.push("/");
    }
  }, []);

  const [sliderValue, setSliderValue] = useState(50);
  const [volume, setVolume] = useState(50);

  const handleChange = (e) => {
    setSliderValue(Number(e.target.value));
  };
  const changeVolume = () => {
    setTimeout(() => {
      setVolume(document.querySelector("#volumeSlider").value);
    }, 50);
  };

  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-1/8">
        <SideBarComponent
          setConnected={setIsConnected}
          connected={isConnected}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="w-7/8 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-8">
            <div className="mb-8">
              <SearchComponent />
            </div>
            {/* {() => {switch(currentPage){
                  case "playlist":
                    return <PlaylistWindowComponent />;
                  default:
                    return <PlaylistWindowComponent />;
                }}} */}
            <AppWindowComponent currentPage={currentPage} />
          </div>
        </div>
        <div className="h-[100px] bg-[#252525]">
          <MusicManagerComponent volume={volume} connected={isConnected} />
        </div>
        <div className="px-4 py-2">
          <input
            type="range"
            id="volumeSlider"
            min="0"
            max="100"
            value={sliderValue}
            step="1"
            onChange={handleChange}
            onMouseUp={changeVolume}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );  
};

export default musicPage;