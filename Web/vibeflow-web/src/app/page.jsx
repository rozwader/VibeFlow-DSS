"use client"

import HeaderComponent from "@/components/headerComponent";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    if(localStorage.getItem("TOKEN") != null){
      // uzytkownik jest juz zalogowany
    }
  }, [])

  return (
    <>
      <HeaderComponent title="Vibe Flow"/>
      <h2>Tutaj ma być landing page, czyli wyjasnienie projektu, mozliwosc zalogowania/zarejestrowania oraz przejscie do aplikacji muzycznej</h2>
      <Link className="text-red-500" href={`/music/`}>Muzyka</Link>
      <Link className="text-red-500" href={`/login/`}>Login</Link>
      <Link className="text-red-500" href={`/register/`}>Register</Link>
    </>
    
  );
}
