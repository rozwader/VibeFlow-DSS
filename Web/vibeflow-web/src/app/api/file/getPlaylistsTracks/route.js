import { NextResponse } from 'next/server';
import { createConn } from '@/lib/db';

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    const data = await req.json();
    const Ids = data.data;

    const tracks = [];

    try{
        const db = await createConn();

        for(let i = 0; i < Ids.length; i++){
            const query = `SELECT * FROM files WHERE platform=0 AND id=${Ids[i].fileId}`;
            const dbResponse = await db.query(query);

            tracks.push([dbResponse[0][0], Ids[i].playlistId])
        }
        
        return response(tracks, 200)
    }catch(err){
        console.log(`Couldn't get playlists tracks | ${err}`);
        return response(err, 500)
    }
}