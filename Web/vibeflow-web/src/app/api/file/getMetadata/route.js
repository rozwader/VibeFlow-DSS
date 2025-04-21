import { NextResponse } from "next/server";
import { createConn } from "@/lib/db";

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const GET = async (req) => {
    try{
        const db = await createConn();
        const query = `SELECT * FROM files`;
        const dbResponse = await db.query(query);

        return response(dbResponse, 200);
    }catch(err){
        console.log(`Couldn't get files metadata | ${err}`)
        return response(err, 500);
    }
}