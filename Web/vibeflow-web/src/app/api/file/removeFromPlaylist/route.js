import { NextResponse } from "next/server"
import { createConn } from "@/lib/db"

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    const data = await req.json();
    const id = data.contentId;

    try{
        const db = await createConn();
        const query = `DELETE FROM playlistscontent WHERE id='${id}'`;
        const dbResponse = await db.query(query);
        
        return response(dbResponse, 200);
    }catch(err){
        console.log(err);
        return response(err, 500);
    }
}   