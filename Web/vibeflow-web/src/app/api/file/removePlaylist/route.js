import { NextResponse } from "next/server"
import { createConn } from "@/lib/db"

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    const data = await req.json();
    const id = data.id;

    try{
        const db = await createConn();
        const query = `DELETE FROM playlists WHERE id='${id}'`;
        const query2 = `DELETE FROM playlistscontent WHERE playlistId='${id}'`;
        const dbResponse = await db.query(query);
        const dbResponse2 = await db.query(query2);

        return response(dbResponse, 200);
    }catch(err){
        console.log(err);
        return response(err, 500);
    }
}   