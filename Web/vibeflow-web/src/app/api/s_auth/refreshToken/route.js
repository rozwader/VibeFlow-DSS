import { NextResponse } from "next/server"

const response = (message, status) => { // skrot funkcji zwracajacej
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => { // endpoint POST ktory wysyla zapytanie do spotify o ponowienie tokenu dzieki refreshToken po jego wygasnieciu
    const reqData = await req.json();
    const r_token = reqData["r_token"];
    console.log(reqData);
    try{
        const request = await fetch("https://accounts.spotify.com/api/token", { // fetch wysylajacy refreshToken aby otrzymac nowy token oraz refreshToken
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