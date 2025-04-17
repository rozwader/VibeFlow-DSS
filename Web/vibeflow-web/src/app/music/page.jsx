"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SideBarComponent from "@/components/SideBarComponent";
import AppWindowComponent from "@/components/AppWindowComponent";
import MusicManagerComponent from "@/components/MusicManagerComponent";
import PlaylistsWindowComponent from "@/components/appWindowComponents/PlaylistsWindowComponent";
import HomeWindowComponent from "@/components/appWindowComponents/HomeWindowComponent";
import FavoritesWindowComponent from "@/components/appWindowComponents/FavoritesWindowComponent";

const musicPage = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [isConnected, setIsConnected] = useState(false); // stan przechowujacy informacje o tym czy uzytkownik jest polaczony do spotify
  const [currentPage, setCurrentPage] = useState(""); // stan przechowujący aktualnie wyswietlana strone

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  const checkToken = async () => { // funkcja sprawdza czy lokalny token uzytkownika jest poprawny
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

  useEffect(() => { // wydarzenie sprawdzajace czy uzytkownik posiada token
    const localToken = localStorage.getItem("TOKEN");

    if (session || localToken) {
      if (localToken) {
        checkToken();
      }
  
      if (session?.user) {
        console.log("Zalogowany przez Google:");
        console.log("Imię/Nazwa:", session.user.name);
        console.log("Email:", session.user.email);
      }
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [session, status]);
  const [volume, setVolume] = useState(50); // stan przechowujacy glosnosc muzyki

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