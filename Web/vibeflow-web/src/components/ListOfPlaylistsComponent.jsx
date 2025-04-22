import { useEffect, useState } from "react";

const ListOfPlaylistsComponent = (props) => {
    
    const [userPlaylists, setUserPlaylists] = useState(null);

    const getUserPlaylists = async () => {
        const user = localStorage.getItem("User")

        try{
            const request = await fetch("/api/file/getUserPlaylists/", {
                method: "POST",
                body: JSON.stringify({user})
            });

            if(request.ok){
                const data = await request.json();
                setUserPlaylists(data.message[0]);
            }
        }catch(err){
            console.log(`Couldn't get user playlists | ${err}`);
        }
    }
    
    useEffect(() => {
        getUserPlaylists();
    }, [])

    const handleClick = async (e, id) => {
        e.preventDefault();

        const songToAddId = props.songToAddId;

        try{
            const request = await fetch("/api/file/addToPlaylist/", {
                method: "POST",
                body: JSON.stringify({songToAddId, id}),
            })

            if(request.ok){
                console.log("added to playlist");
            }else{
                console.log("not added to playlist");
            }
        }catch(err){
            console.log(`Couldn't add song to the playlist | ${err}`);
        }

        props.shutDown(false);
    }

    return(
        <div className="absolute w-full h-full top-[0] left-[0] p-4 flex flex-col items-center justify-center gap-7 backdrop-blur-lg z-[2]">
            <h1 className="font-semibold text-3xl flex flex-row items-center gap-2">Your Playlists <button type="button" className="bg-red-500 w-7 h-7 text-sm text-white rounded-xl cursor-pointer hover:bg-white hover:text-black hover:border" onClick={() => props.shutDown(false)}>X</button></h1>
            {userPlaylists != null ? (
                userPlaylists.map((playlist) => {
                    return <button onClick={(e) => handleClick(e, playlist.id)} key={playlist.id} type="button" className="border scale-150 p-2 cursor-pointer rounded-xl">{playlist.name} +</button>
                })
            ) : (null)}
        </div>
    )
}

export default ListOfPlaylistsComponent;