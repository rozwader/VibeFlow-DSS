import { useEffect } from "react";

const ListOfPlaylistsComponent = () => {
    
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
                console.log(data.message);
            }
        }catch(err){
            console.log(`Couldn't get user playlists | ${err}`);
        }
    }
    
    useEffect(() => {
        getUserPlaylists();
    }, [])

    return(
        <div>

        </div>
    )
}

export default ListOfPlaylistsComponent;