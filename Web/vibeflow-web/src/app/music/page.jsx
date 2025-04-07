"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBarComponent from "@/components/SideBarComponent";
import AppWindowComponent from "@/components/AppWindowComponent";
import MusicManagerComponent from "@/components/MusicManagerComponent";
import SearchComponent from "@/components/SearchComponent";
import PlaylistWindowComponent from "@/components/appWindowComponents/PlaylistWindowComponent";

const musicPage = () => {
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);

  // lista stron
  // settings, albums, favorites, playlist, addplaylist, addsong

  const pageComponents = {
    "playlist": <PlaylistWindowComponent />
  }

  const [currentPage, setCurrentPage] = useState("");

  const returnPage = () => {
    return pageComponents[currentPage]
  }

  useEffect(() => {
    console.log(currentPage)
  }, [currentPage])

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
  const [volume, setVolume] = useState(50)

  const handleChange = (e) => {
    setSliderValue(Number(e.target.value));
  }
  const changeVolume = () => {
    setTimeout(() => {
      setVolume(document.querySelector("#volumeSlider").value);
    }, 50)
  }

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-start">
        <div className="w-1/8">
            <SideBarComponent setConnected={setIsConnected} connected={isConnected} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
        
        <div className="w-7/8 h-screen flex flex-col">
            <div className="w-1/1 h-4/5 relative">
                <div className="absolute top-[10px] left-[10px]">
                    <SearchComponent />
                </div>
                {/* {() => {switch(currentPage){
                  case "playlist":
                    return <PlaylistWindowComponent />;
                  default:
                    return <PlaylistWindowComponent />;
                }}} */}
                <AppWindowComponent currentPage={currentPage} />
                <div className="absolute bottom-[10px] left-[10px]">
                  <input type="range" id="volumeSlider"
                  min="0"
                  max="100"
                  value={sliderValue}
                  step="1"
                  onChange={handleChange}
                  onMouseUp={changeVolume}
                  className="w-100 h-10 color-white"
                  />
                </div>
            </div>
            <div className="w-1/1 h-1/5 bg-[#252525]">
                <MusicManagerComponent volume={volume} connected={isConnected} />
            </div>
        </div>
    </div>
  );
};

export default musicPage;
