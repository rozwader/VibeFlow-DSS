import { useState } from "react";

const CreatePlaylistComponent = () => {

    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const creator = localStorage.getItem("User");

        try{
            const request = await fetch("/api/file/createPlaylist/", {
                method: "POST",
                body: JSON.stringify({name, creator})
            })

            if(!request.ok){
                const data = await request.json();
                console.log(data.message);
                setError(data.message);
            }else{
                const data = await request.json();
                setResponse(data.message);
            }
        }catch(err){
            console.log(`Couldn't create a playlist | ${err}`)
        }
    }

    return (
        <div className="p-2 border w-fit flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Create Playlist</h1>
            <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" name="name" placeholder="Playlist Name" className="border rounded-xl p-2 text-xl" required/>
                <button type="submit" className="flex gap-1 items-center justify-center border border-black p-1 hover:bg-purple-500 hover:text-white hover:border-white transition-colors">Send</button>
            </form>
            {response != "" ? (<span className="text-green-500">{response}</span>) : (null)}
            {error != "" ? (<span className="text-red-500">{error}</span>) : (null)}
        </div>
    )
}

export default CreatePlaylistComponent;