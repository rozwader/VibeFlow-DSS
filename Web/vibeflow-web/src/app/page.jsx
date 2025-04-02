"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BsArrowUpRight } from "react-icons/bs";
import vibeflowlogo from "../../public/vibeflowlogo.png";

export default function Home() {

  const checkToken = async () => {
    const token = localStorage.getItem("TOKEN");
    try{
      const request = await fetch("/api/auth/tokencheck", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({token})
      });

      const data = await request.json();
      console.log(data);

      if(!request.ok){
        // token wygasł i uzytkownik musi sie zalogowac jeszcze raz
      }else{
        // token nadal jest prawidlowy, mozna od razu zalogowac i przeniesc do aplikacji
      }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if(localStorage.getItem("TOKEN") != null){
      checkToken();
    }
  }, []);

  return (
    <>
      <div className="absolute top-10 right-10 flex gap-1">
        <Link
          href={`/music/`}
          className="flex items-center p-2 pl-5 pr-5 rounded-xl border border-white hover:border-black"
        >
          <BsFillPlayCircleFill className="mr-1" />
          <span>Listen now</span>
        </Link>
        <Link
          href={`/login/`}
          className="flex items-center bg-black rounded-xl text-white p-2 pl-5 pr-5 border border-black hover:bg-white hover:text-black"
        >
          <BsFillPersonFill className="mr-1" />
          <span>Sign in</span>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image src={vibeflowlogo} alt="logo" className="w-128 h-128"></Image>
        <Link href={`/music/`} className="flex items-center">
          <div className="flex items-center border border-black p-2 pl-5 pr-5 hover:bg-purple-500 hover:text-white hover:border-white scale-150">
            <BsMusicNoteBeamed className="mr-1" />
            <span>Start</span>
            <BsArrowUpRight className="ml-1" />
          </div>
        </Link>
      </div>
    </>
  );
}
