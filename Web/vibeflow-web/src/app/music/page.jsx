"use client"

import HeaderComponent from "@/components/HeaderComponent";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

const musicPage = () => {

    const router = useRouter();

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
            localStorage.removeItem("TOKEN");
            localStorage.removeItem("User");
        }

        }catch(err){
        console.log(err);
        }
    }

    useEffect(() => {
        if(localStorage.getItem("TOKEN") != null){
            checkToken();
        }else{
            router.push("/")
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("User");
    }

    return(
        <>
            <HeaderComponent title="skibidi"/>
            <h2>Tutaj ma być cała aplikacji itp</h2>
            <Link className="text-red-500" href='/' onClick={handleLogout}>Wyloguj</Link>
        </>
        
    );
}

export default musicPage;