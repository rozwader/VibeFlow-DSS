import { NextResponse } from "next/server"
import { createConn } from "@/lib/db"

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {

    const data = await req.json();
    const songName = data.fileName;
    console.log(songName);
    try{
        const db = await createConn();
        const query = `SELECT name FROM files WHERE fileName='${songName}'`;
        const dbResponse = await db.query(query);

        return response(dbResponse[0][0].name, 200);
    }catch(err){
        console.log(`Couldn't get the file | ${err}`)
        return response(err, 500)
    }
}