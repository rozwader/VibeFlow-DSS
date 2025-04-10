"use client"

const PlayMusicButtonComponent = (props) => {

    const token = localStorage.getItem("S_TOKEN");
    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
      };

    const nextInQueue = async () => {
        try{
            const request = await fetch("https://api.spotify.com/v1/me/player/next", {
                headers: headers,
                method: "POST"
            })
        }catch(err){
            console.log(`Couldn't skip to the next | ${err}`)
        }
    }

    const addToQueue = async (uri) => {
        console.log(uri)
        try{
            const request = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
                headers: headers,
                method: "POST",
                body: {
                    uri: uri,
                }
            })

            if(request.ok){
                console.log("Added to the queue");
                await nextInQueue();
            }else{
                const data = await request.json();
                console.log(data);
            }
        }catch(err){
            console.log(`Couldn't add to the queue | ${err}`);
        }
    }

    return(
        <button type="button" className="cursor-pointer mr-[30px] border border-[#1DB954] p-2 pr-[15px] shadow-md pl-[15px] bg-[#1DB954] text-white font-semibold rounded-xl hover:bg-white hover:text-black hover:border-black" onClick={() => addToQueue(props.uri)}>PLAY</button>
    );
}

export default PlayMusicButtonComponent;