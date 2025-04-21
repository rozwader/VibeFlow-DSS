import { NextResponse } from "next/server"
import { createConn } from "@/lib/db"

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    const data = await req.json();
    const playlistName = data.name;
    const creator = data.creator;

    try{
        const db = await createConn();

        const checkIfExistsQ = `SELECT name FROM playlists WHERE name='${playlistName}'`
        const checkIfExists = await db.query(checkIfExistsQ);

        if(checkIfExists[0].length != 0){
            return response("Playlist with this name already exists", 403);
        }

        const nowDate = new Date.now();
        const query = `INSERT INTO playlists(name, creator, createdAt) VALUES ('${playlistName}','${creator}','${nowDate}')`;
        const dbResponse = await db.query(query);

        return response("Playlist created", 200);
    }catch(err){
        console.log(`Couldn't create a playlist | ${err}`)
        return response(err, 500);
    }
}