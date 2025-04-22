import { NextResponse } from "next/server"
import { createConn } from "@/lib/db"

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    const data = await req.json();
    const id = data.id; // playlist Id
    const songId = data.songToAddId; // song Id
    
    try{
        const db = await createConn();
        const query = `INSERT INTO playlistscontent(fileId, playlistId) VALUES ('${songId}','${id}')`;
        const dbResponse = await db.query(query);

        return response("Added Song To Playlist", 200)
    }catch(err){
        console.log(`Couldn't add a song to playlist | ${err}`)
        return response(err, 500)
    }
}