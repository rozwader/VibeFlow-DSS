"use client";

import vibeflowlogo from "../../public/vibeflowlogo.png";
import Image from "next/image";
import Link from "next/link";
import SideBarLinkComponent from "./SideBarLinkComponent";
import SideBarButtonComponent from "./SideBarButtonComponent";
import { BsFillHouseDoorFill, BsRecordCircle, BsFillHeartFill, BsMusicNoteList, BsFolderPlus, BsBoxArrowRight, BsGearFill } from "react-icons/bs";
import { useState } from "react";

const SideBarComponent = () => {
  const [currentPage, setCurrentPage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("User");
  };

  return (
    <div className="w-64 md:w-56 h-screen bg-white shadow-md border-r flex flex-col p-4">
      <div className="flex items-center justify-center mb-6">
        <Image src={vibeflowlogo} alt="VibeFlow Logo" className="w-36" />
      </div>
      <nav className="space-y-1">
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
      </nav>
    </div>
  );
};

export default SideBarComponent;