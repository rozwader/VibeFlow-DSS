"use client";

import { signOut } from "next-auth/react";
import vibeflowlogo from "../../public/vibeflowlogo.png";
import Image from "next/image";
import Link from "next/link";
import SideBarButtonComponent from "./SideBarButtonComponent";
import {
  BsFillHouseDoorFill,
  BsRecordCircle,
  BsFillHeartFill,
  BsMusicNoteList,
  BsFolderPlus,
  BsBoxArrowRight,
  BsGearFill,
  BsGear,
  BsSearch,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import ConnectedConfComponent from "./ConnectedConfComponent";

const SideBarComponent = (props) => {
  const [sToken, setSToken] = useState("");

  const handleLogout = () => {
    props.setConnected(false);
    localStorage.clear();
    signOut({ redirect: false });
  };

  const getLoginToSpotify = async () => {
    try {
      const request = await fetch("/api/s_auth/login", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await request.json();
      console.log(data.message);

      return data.message;
    } catch (err) {
      console.log(`Couldn't Log In To Spotify | ${err}`);
    }
  };

  const retrieveSToken = async () => {
    try {
      const request = await fetch("/api/s_auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (request.ok) {
        const data = await request.json();

        const currentTime = new Date().getTime() + 60 * 60 * 1000;

        localStorage.setItem("S_TOKEN", data.message.token);
        localStorage.setItem("S_TOKEN_EXPIRES_IN", currentTime);
        localStorage.setItem("S_REFRESH", data.message.refreshToken);
        setSToken(data.message.token);
        props.setConnected(true);

        if (document.querySelector("#logSpot") != undefined) {
          document.querySelector("#logSpot").remove();
        }

        return true;
      } else {
        const data = await request.json();
        console.log(data.message);
        return false;
      }
    } catch (err) {
      console.log(`Couldn't retrieve Spotify Token | ${err}`);
    }
  };

  const generateLink = async () => {
    const spotifyLink = await getLoginToSpotify();

    const newLink = document.createElement("a");
    newLink.href = spotifyLink;
    newLink.innerText = "Connect To Spotify";
    newLink.id = "logSpot";
    newLink.className =
      "text-xs bg-[#ff0000] rounded-xl p-2 text-white font-bold";

    if (
      document.querySelector("#logSpot") == undefined ||
      document.querySelector("#logSpot") == null
    ) {
      document.querySelector("#navbar").appendChild(newLink);
    }
  };

  const refreshToken = async () => {
    const r_token = localStorage.getItem("S_REFRESH");

    try{
      const request = await fetch("/api/s_auth/refreshToken/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({r_token})
      })

      if(request.ok){
        const data = await request.json();
        console.log(data);

        const currentTime = new Date().getTime() + 60 * 60 * 1000;

        localStorage.setItem("S_TOKEN", data.message.newToken);
        localStorage.setItem("S_REFRESH", data.message.newRToken);
        localStorage.setItem("S_TOKEN_EXPIRES_IN", currentTime);

        setSToken(localStorage.getItem("S_TOKEN"));
        props.setConnected(true);
      }
    }catch(err){
      console.log(`Couldn't Refresh Spotify Token | ${err}`)
    }
  }

  const manageRenderingSite = async () => {
    if (localStorage.getItem("S_TOKEN") != null) {
      console.log("1");
      const token_expiration_time = parseInt(
        localStorage.getItem("S_TOKEN_EXPIRES_IN")
      );
      const currentTime = new Date().getTime();
      console.log(currentTime, token_expiration_time);
      if (token_expiration_time < currentTime) {
        console.log(11);
        refreshToken();
      } else {
        console.log(12);
        setSToken(localStorage.getItem("S_TOKEN"));
        props.setConnected(true);
      }
    } else {
      console.log(2);
      const request = await retrieveSToken();

      if (request == false) {
        console.log(21);
        generateLink();
      } else {
        console.log(22);
        setSToken(localStorage.getItem("S_TOKEN"));
        props.setConnected(true);
      }
    }
  };

  useEffect(() => {
    manageRenderingSite();
  }, []);

  return (
    <div className="w-1/1 md:w-1/1 h-screen bg-white shadow-md flex flex-col p-4">
      <div className="flex items-center justify-center mb-6">
        <Image src={vibeflowlogo} alt="VibeFlow Logo" className="w-36" />
      </div>
      <nav className="space-y-1" id="navbar">
        <span className="text-gray-600 text-sm font-semibold">Menu</span>
        <SideBarButtonComponent
          icon={<BsFillHouseDoorFill />}
          text="Home"
          action={props.setCurrentPage}
          to="home"
        />
        <SideBarButtonComponent
          icon={<BsSearch />}
          text="Search"
          action={props.setCurrentPage}
          to="search"
        />
        <SideBarButtonComponent
          icon={<BsFillHeartFill />}
          text="Your favorites"
          action={props.setCurrentPage}
          to="favorites"
        />
        <SideBarButtonComponent
          icon={<BsRecordCircle />}
          text="Albums"
          action={props.setCurrentPage}
          to="albums"
        />
        <SideBarButtonComponent
          icon={<BsMusicNoteList />}
          text="Your playlists"
          action={props.setCurrentPage}
          to="playlists"
        />
        <span className="text-gray-600 text-sm font-semibold">
          Playlists
        </span>

        <SideBarButtonComponent
          icon={<BsFolderPlus />}
          text="Add playlist"
          action={props.setCurrentPage}
          to="addplaylist"
        />
        <SideBarButtonComponent
          icon={<BsFolderPlus />}
          text="Add song"
          action={props.setCurrentPage}
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
          action={props.setCurrentPage}
          to="settings"
        />
        {props.connected ? <ConnectedConfComponent /> : null}
      </nav>
    </div>
  );
};

export default SideBarComponent;
