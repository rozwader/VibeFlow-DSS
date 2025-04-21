import { NextResponse } from "next/server"
import { createConn } from "@/lib/db"

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    const data = await req.json();
    const user = data.user;

    try{
        const db = await createConn();
        const query = `SELECT * FROM playlists WHERE creator='${user}'`;
        const dbResponse = await db.query(query);

        return response(dbResponse, 200);
    }catch(err){
        return response(err, 500);
    }
}   