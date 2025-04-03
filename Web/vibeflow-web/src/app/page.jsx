"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import vibeflowlogo from "../../public/vibeflowlogo.png";
import { useRouter } from "next/navigation";
import StartButtonComponent from "@/components/StartButtonComponent";
import LoginButtonComponent from "@/components/LoginButtonComponent";

export default function Home() {
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
    }
  }, []);

  const handleSubmit = () => {
    if (localStorage.getItem("TOKEN") != null) {
      console.log(localStorage.getItem("TOKEN"));
      router.push("/music/");
    } else {
      router.push("/login/");
    }
  };

  return (
    <>
      <div className="absolute top-10 right-10 flex gap-1">
        <button
          onClick={handleSubmit}
          className="flex items-center p-2 pl-5 pr-5 rounded-xl border border-white hover:border-black cursor-pointer transition-colors"
        >
          <BsFillPlayCircleFill className="mr-1" />
          <span>Listen now</span>
        </button>

        {localStorage.getItem("TOKEN") != null ? (
          <span className="flex items-center bg-black rounded-xl text-white p-2 pl-5 pr-5 border border-black hover:bg-white hover:text-black transition-colors">
            Hello, {localStorage.getItem("User")}
          </span>
        ) : (
          <LoginButtonComponent />
        )}
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image src={vibeflowlogo} alt="logo" className="w-128 h-128"></Image>
        {localStorage.getItem("TOKEN") != null ? (
          <StartButtonComponent destination="/music/" />
        ) : (
          <StartButtonComponent destination="/register/" />
        )}
      </div>
    </>
  );
}
