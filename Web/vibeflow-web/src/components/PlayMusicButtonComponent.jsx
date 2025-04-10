"use client"

import { FaPlay } from "react-icons/fa";

const PlayMusicButtonComponent = (props) => {
    const token = localStorage.getItem("S_TOKEN");
    if (!token) return null;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const nextInQueue = async () => {
        try {
            await fetch("https://api.spotify.com/v1/me/player/next", {
                headers: headers,
                method: "POST"
            });
        } catch (err) {
            console.log(`Couldn't skip to the next | ${err}`);
        }
    };

    const addToQueue = async (uri) => {
        try {
            const request = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
                headers: headers,
                method: "POST"
            });

            if (request.ok) {
                console.log("Added to the queue");
                await nextInQueue();
            } else {
                const data = await request.json();
                console.log(data);
            }
        } catch (err) {
            console.log(`Couldn't add to the queue | ${err}`);
        }
    };

    return (
        <button
            type="button"
            className="cursor-pointer mr-[30px] border border-[#1DB954] p-2 shadow-md bg-[#1DB954] text-white rounded-full hover:bg-white hover:text-black hover:border-black transition"
            onClick={() => addToQueue(props.uri)}
            aria-label="Play"
        >
            <FaPlay size={14} />
        </button>
    );
};

export default PlayMusicButtonComponent;
