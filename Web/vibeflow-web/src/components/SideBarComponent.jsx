"use client";

import vibeflowlogo from "../../public/vibeflowlogo.png";
import Image from "next/image";
import Link from "next/link";
import SideBarLinkComponent from "./SideBarLinkComponent";
import SideBarButtonComponent from "./SideBarButtonComponent";
import { BsFillHouseDoorFill, BsRecordCircle, BsFillHeartFill, BsMusicNoteList, BsFolderPlus, BsBoxArrowRight, BsGearFill, BsGear } from "react-icons/bs";
import { useEffect, useState } from "react";
import ConnectedConfComponent from "./ConnectedConfComponent";

const SideBarComponent = () => {
  const [currentPage, setCurrentPage] = useState("");
  const [sToken, setSToken] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("User");
    localStorage.removeItem("S_TOKEN");
  };

  const getLoginToSpotify = async () => {
    try{
      const request = await fetch("/api/s_auth/login", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      const data = await request.json();
      console.log(data.message);

      return data.message
    }catch(err){
      console.log(`Couldnt Log In To Spotify | ${err}`);
    }
  }

  const retrieveSToken = async () => {
    try{
      const request = await fetch("/api/s_auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if(request.ok){
        const data = await request.json();
        localStorage.setItem("S_TOKEN", data.message);
        props.setConnected(true)

        document.querySelector("#logSpot").remove();

        return true;
      }else{
        return false;
      }
    }catch(err){
      console.log(`Couldn't retrieve Spotify Token | ${err}`);
    }
  }

  const generateLink = async () => {
    const spotifyLink = await getLoginToSpotify();

    const newLink = document.createElement("a");
    newLink.href = spotifyLink;
    newLink.innerText = "Log In To Spotify";
    newLink.id = "logSpot";

    if(document.querySelector("#logSpot") == undefined || document.querySelector("#logSpot") == null){
      document.querySelector("#navbar").appendChild(newLink);
    }
  }

  const manageRenderingSite = async () => {
    if(localStorage.getItem("S_TOKEN") == null){
      const request = await retrieveSToken();

      if(request == false){
        generateLink();
      }
    }else{
      setSToken(localStorage.getItem("S_TOKEN"));
      props.setConnected(true)
    }
  }

  useEffect(() => {
    manageRenderingSite();
  }, [])

  return (
    <div className="w-1/1 md:w-1/1 h-screen bg-white shadow-md flex flex-col p-4">
      <div className="flex items-center justify-center mb-6">
        <Image src={vibeflowlogo} alt="VibeFlow Logo" className="w-36" />
      </div>
      <nav className="space-y-1" id="navbar">
        <span className="text-gray-600 text-sm font-semibold">Menu</span>
        <SideBarLinkComponent 
          icon={<BsFillHouseDoorFill />} 
          text="Home" 
          to="/music/"
        />
        <SideBarButtonComponent 
          icon={<BsRecordCircle />} 
          text="Albums" 
          action={setCurrentPage} 
          to="albums" 
        />

        <span className="text-gray-600 text-sm font-semibold">Playlist and favorite</span>
        <SideBarButtonComponent 
          icon={<BsFillHeartFill />} 
          text="Your favorites" 
          action={setCurrentPage} 
          to="favorites" 
        />
        <SideBarButtonComponent 
          icon={<BsMusicNoteList />} 
          text="Your playlist" 
          action={setCurrentPage} 
          to="playlist" 
        />
        <SideBarButtonComponent 
          icon={<BsFolderPlus />} 
          text="Add playlist" 
          action={setCurrentPage} 
          to="addplaylist" 
        />
        <SideBarButtonComponent 
          icon={<BsFolderPlus />} 
          text="Add song" 
          action={setCurrentPage} 
          to="addsong" 
        />

        <span className="text-gray-600 text-sm font-semibold">General</span>
        <Link
          href="/"
          className="flex items-center gap-2 text-red-500 hover:bg-gray-200 rounded-lg py-2 px-4"
          onClick={handleLogout}
        >
          <BsBoxArrowRight />
          <span>Log out</span>
        </Link>
        <SideBarButtonComponent 
          icon={<BsGearFill />} 
          text="Settings" 
          action={setCurrentPage} 
          to="settings" 
        />
        {sToken != "" ? (<ConnectedConfComponent/>) : (null)}
      </nav>
    </div>
  );
};

export default SideBarComponent;