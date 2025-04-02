"use client"

import HeaderComponent from "@/components/headerComponent";
import Link from "next/link";
import { useEffect } from "react";

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
