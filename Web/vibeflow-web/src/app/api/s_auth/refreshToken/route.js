import { NextResponse } from "next/server"

const response = (message, status) => {
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    const reqData = await req.json();
    const r_token = reqData["r_token"];

    try{
        const request = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: r_token,
                client_id: process.env.SPOTIFY_CLIENT_ID,
            })
            
        });
    
        if(request.ok){
            const data = await request.json();
            const newToken = data.access_token;
            const newRToken = data.refresh_token;
            console.log("działa")
            return response({newToken, newRToken}, 200)
        }else{
            const data = await request.json();
            console.log(data);
            return response(`Error | ${data}`, 404);
        }
    }catch(err){
        return response(`Couldn't Get The Refreshed Token | ${err}`)
    }
}