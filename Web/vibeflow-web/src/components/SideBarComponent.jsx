"use client";

import vibeflowlogo from "../../public/vibeflowlogo.png";
import Image from "next/image";
import Link from "next/link";
import SideBarLinkComponent from "./SideBarLinkComponent";
import SideBarButtonComponent from "./SideBarButtonComponent";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsRecordCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { BsMusicNoteList } from "react-icons/bs";
import { BsFolderPlus } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import { BsGearFill } from "react-icons/bs";

const SideBarComponent = () => {
  const [currentPage, setCurrentPage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("User");
  };

  return (
    <div className="w-1/6 h-screen flex flex-col items-start justify-start border">
      <Image src={vibeflowlogo} alt="logo" className="w-full" />
      <div className="flex flex-col items-start justify-start ml-8">
        <span>Menu</span>
        <div className="flex flex-col items-start justify-start">
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
        </div>
        <span>Playlist and favorite</span>
        <div className="flex flex-col items-start justify-start">
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
        </div>
        <span>General</span>
        <div className="flex flex-col items-start justify-start">
          <div className="flex items-start justify-start">
            <Link
              href={"/"}
              className="flex items-start justify-start gap-1 scale-150"
              onClick={handleLogout}
            >
              <BsBoxArrowRight />
              <span>Log out</span>
            </Link>
          </div>
          <SideBarButtonComponent
            icon={<BsGearFill />}
            text="Settings"
            action={setCurrentPage}
            to="settings"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBarComponent;
