"use client"

import { useState } from "react";

const AlbumWindowComponent = (props) => {

    const [currentTracks, setCurrentTracks] = useState(undefined)
    const [albumImageUrl, setAlbumImageUrl] = useState(undefined)

    const getAlbumImage = async (token) => {
        try{
            const request = await fetch(`https://api.spotify.com/v1/albums/${props.albumId}`, {
                headers: {Authorization: `Bearer ${token}`,},
                method: "GET"
            })

            if(request.ok){
                const data = await request.json();
                const image = data.images[1];

                setAlbumImageUrl(image.url);
            }
        }catch(err){
            console.log(`Couldn't get album image | ${err}`)
        }
    }

    const generateComponent = async () => {
        const token = localStorage.getItem("S_TOKEN");
        if (!token) return;

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try{
            const request = await fetch(`https://api.spotify.com/v1/albums/${props.albumId}/tracks?limit=50`, {
                headers: headers,
                method: "GET"
            })

            if(request.ok){
                const data = await request.json();
                setCurrentTracks(data.items)
                await getAlbumImage(token);
            }
        }catch(err){
            console.log(`Couldn't get Album | ${err}`)
        }

    }   
    

    return(
        <div>
            
        </div>
    )
}

export default AlbumWindowComponent