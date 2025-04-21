import { useEffect, useState } from "react";
import CreatePlaylistComponent from "../CreatePlaylistComponent";

const CommunityPlaylistsWindowComponent = () => {

    const [playlists, setPlaylists] = useState(null);
    const [playlistsData, setPlaylistsData] = useState(null);
    const [playlistsTracks, setPlaylistsTracks] = useState(null);

    const getPlaylistsTracks = async (data) => {
        try{
            const request = await fetch("/api/file/getPlaylistsTracks/", {
                method: "POST",
                body: JSON.stringify({data})
            })

            if(request.ok){
                const data = await request.json();
                setPlaylistsTracks(data.message);
                console.log(data.message)
            }
        }catch(err){
            console.log(`Couldn't get playlists tracks | ${err}`)
        }
    }

    const getPlaylistsData = async () => {
        try{
            const request = await fetch("/api/file/getPlaylistsContent", {
                method: "GET"
            })

            if(request.ok){
                const data = await request.json();
                setPlaylistsData(data.message[0]);
                getPlaylistsTracks(data.message[0]);
            }
        }catch(err){
            console.log(`Couldn't get playlists data | ${err}`);
        }
    }

    const getPlaylists = async () => {
        try{
            const request = await fetch("/api/file/getPlaylists/", {
                method: "GET"
            })

            if(request.ok){
                const data = await request.json();
                setPlaylists(data.message[0]);
                await getPlaylistsData();
                console.log(data, "playlists");
            }
        }catch(err){
            console.log(`Couldn't get playlists | ${err}`);
        }
    }

    useEffect(() => {
        getPlaylists();
    }, [])

    return(
        <div className="p-8 flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-black mb-4">Community Playlists</h1>
            <CreatePlaylistComponent />
            <div className="flex flex-row gap-2">
                {playlists != null ? (playlists.map((playlist) => {
                    return <div key={playlist.id} className="flex flex-col p-2 border rounded-xl">
                        <span className="text-xl font-semibold">{playlist.name}</span>
                        <span className="text-gray-500 mb-2">{playlist.creator}</span>
                        <div className="p-2 border rounded-xl">{playlistsTracks != null ? (playlistsTracks.map((track) => {
                            if(track[1] == playlist.id){
                                return <div key={track[0].fileName} className="flex flex-col gap-1">
                                    <span className="text-2xl font-semibold border p-2 rounded-xl">{track[0].name}</span>
                                    <audio controls>
                                        <source src={`/uploads/${track[0].fileName}`} type="audio/mpeg"/>
                                    </audio>
                                    <span className="text-gray-500">Creator: {track[0].creator}</span>
                                    <span className="text-gray-500">Artist: {track[0].artist != "" ? (track[0].artist) : ("Unknown")}</span>
                                </div>
                            }
                        })) : (null)}</div>
                    </div>
                })) : (null)}
            </div>
        </div>
    )
}

export default CommunityPlaylistsWindowComponent;