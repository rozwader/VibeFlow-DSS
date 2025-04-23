import CreatePlaylistComponent from "../CreatePlaylistComponent";
import {useState, useEffect} from 'react';

const OwnPlaylistWindowComponent = () => {
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
                console.log("playlist Data", data.message[0])
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

    const handleRemove = async (e, pId, sId) => {
        e.preventDefault();

        let contentId = 0;

        playlistsData.forEach((element) => {
            if(element.fileId == sId && element.playlistId == pId){
                contentId = element.id;
            }
        });

        try{
            const request = await fetch("/api/file/removeFromPlaylist/", {
                method: "POST",
                body: JSON.stringify({contentId})
            })

            if(request.ok){
                console.log("successfully removed from playlist");
                await getPlaylistsData();
            }else{
                console.log("not removed from playlist");
            }
        }catch(err){
            console.log(`Couldn't remove from playlist | ${err}`);
        }
    }

    const handleRemovePlaylist = async (e, id) => {
        e.preventDefault();

        try{
            const request = await fetch("/api/file/removePlaylist/", {
                method: "POST",
                body: JSON.stringify({id}),
            })

            if(request.ok){
                await getPlaylists();
            }
        }catch(err){
            console.log(`Couldn't delete playlist | ${err}`);
        }
    }

    return(
        <div className="p-8 flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-black mb-4">Your Playlists</h1>
            <CreatePlaylistComponent refresh={getPlaylists}/>
            <div className="flex flex-row gap-2">
                {playlists != null ? (playlists.map((playlist) => {
                    if(playlist.creator == localStorage.getItem("User")){
                        return <div key={playlist.id} className="flex flex-col p-2 border rounded-xl">
                            <span className="text-xl font-semibold flex flex-row items-center justify-between">{playlist.name}<button type="button" className="bg-red-500 w-7 h-7 text-sm text-white rounded-xl cursor-pointer hover:bg-white hover:text-black hover:border" onClick={(e) => handleRemovePlaylist(e, playlist.id)}>X</button></span>
                            <span className="text-gray-500 mb-2">{playlist.creator}</span>
                            <div className="p-2 border rounded-xl">
                            {playlistsTracks != null ? (playlistsTracks.map((track) => {
                                if(track[1] == playlist.id){
                                    return <div key={track[0].fileName} className="flex flex-col gap-1">
                                        <span className="text-2xl font-semibold border p-2 rounded-xl flex flex-row items-center justify-between">{track[0].name}<button type="button" className="bg-red-500 w-7 h-7 text-sm text-white rounded-xl cursor-pointer hover:bg-white hover:text-black hover:border" onClick={(e) => handleRemove(e, playlist.id, track[0].id)}>X</button></span>
                                        <audio controls>
                                            <source src={`/uploads/${track[0].fileName}`} type="audio/mpeg"/>
                                        </audio>
                                        <span className="text-gray-500">Creator: {track[0].creator}</span>
                                        <span className="text-gray-500">Artist: {track[0].artist != "" ? (track[0].artist) : ("Unknown")}</span>
                                    </div>
                                }
                            })) : (null)}</div>
                        </div>
                    }
                })) : (null)}
            </div>
        </div>
    )
}

export default OwnPlaylistWindowComponent;