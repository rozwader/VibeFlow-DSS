"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBarComponent from "@/components/SideBarComponent";
import AppWindowComponent from "@/components/AppWindowComponent";
import MusicManagerComponent from "@/components/MusicManagerComponent";
import SearchComponent from "@/components/SearchComponent";
import PlaylistsWindowComponent from "@/components/appWindowComponents/PlaylistsWindowComponent";
import HomeWindowComponent from "@/components/appWindowComponents/HomeWindowComponent";
import FavoritesWindowComponent from "@/components/appWindowComponents/FavoritesWindowComponent";

const musicPage = () => {
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);

  // lista stron
  // settings, albums, favorites, playlist, addplaylist, addsong

  const pageComponents = {
    playlists: <PlaylistsWindowComponent />,
    home: <HomeWindowComponent />,
    favorites: <FavoritesWindowComponent />,
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

  const [volume, setVolume] = useState(50);

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
              {isConnected ? (<AppWindowComponent currentPage={currentPage} setCurrentPage={setCurrentPage} />) : (null)}
          </div>
        </div>
        <div className="h-[100px] bg-[#252525]">
          <MusicManagerComponent volume={volume} setVolume={setVolume} connected={isConnected}/>
        </div>
      </div>
    </div>
  );  
};

export default musicPage;