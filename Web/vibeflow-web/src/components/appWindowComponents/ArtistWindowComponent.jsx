"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const ArtistWindowComponent = (props) => {
    const token = localStorage.getItem("S_TOKEN");
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [currentArtist, setCurrentArtist] = useState(undefined); 
    const [currentAlbums, setCurrentAlbums] = useState(undefined);

    const getArtistAlbums = async () => {
        try{
            const request = await fetch(`https://api.spotify.com/v1/artists/${props.artistId}/albums?limit=10&include_groups=album`, {
                headers: headers,
                method: "GET"
            })

            if(request.ok){
                const data = await request.json();

                setCurrentAlbums(data.items.map((elem) => {
                    return (<div>
                        <img src={elem.images[0].url} alt={elem.id} height={elem.images[0].height} width={elem.images[0].width}/>
                        <img src={elem.images[1].url} alt={elem.id} height={elem.images[1].height} width={elem.images[1].width}/>
                        <img src={elem.images[2].url} alt={elem.id} height={elem.images[2].height} width={elem.images[2].width}/>
                        <span>{elem.release_date}</span>
                        <span>{elem.name}</span>
                        <span>{elem.total_tracks}</span>
                        <span>{}</span>
                    </div>)
                }))
            }
        }catch(err){
            console.log(`Couldn't get artist albums | ${err}`)
        }
    }

    const getArtist = async () => {
        try{
            const request = await fetch(`https://api.spotify.com/v1/artists/${props.artistId}`, {
                method: "GET",
                headers: headers
            });

            if(request.ok){
                const data = await request.json();

                setCurrentArtist(
                    <div>
                        <img src={data.images[0].url} alt="large" height={data.images[0].height} width={data.images[0].width}/>
                        <img src={data.images[1].url} alt="medium" height={data.images[1].height} width={data.images[1].width}/>
                        <img src={data.images[2].url} alt="small" height={data.images[2].height} width={data.images[2].width}/>
                        <span>{data.followers.total}</span> {/* ilosc followersow */}
                        <span>{data.name}</span> {/* nazwa */}
                         <span>{data.popularity}</span> {/*popularity w procentach 0-100 */}
                    </div>
                )

                getArtistAlbums();
            }
        }catch(err){
            console.log(`Couldn't get the Artist | ${err}`);
        }
    }
    
    useEffect(() => {
        getArtist();
    }, [])

    return(
        <div className="p-8 w-full space-y-12">
            {currentArtist}
            {currentAlbums}
        </div>
    );
}

export default ArtistWindowComponent;