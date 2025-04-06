"use client";

import HeaderComponent from "@/components/HeaderComponent";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBarComponent from "@/components/SideBarComponent";
import AppWindowComponent from "@/components/AppWindowComponent";
import MusicManagerComponent from "@/components/MusicManagerComponent";
import SearchComponent from "@/components/SearchComponent";

const musicPage = () => {
  const router = useRouter();

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

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-start">
        <div className="w-1/8">
            <SideBarComponent />
        </div>
        
        <div className="w-7/8 h-screen flex flex-col">
            <div className="w-1/1 h-4/5 relative">
                <div className="absolute top-[10px] left-[10px]">
                    <SearchComponent />
                </div>
                <AppWindowComponent />
            </div>
            <div className="w-1/1 h-1/5 bg-[#252525]">
                <MusicManagerComponent />
            </div>
        </div>
    </div>
  );
};

export default musicPage;
