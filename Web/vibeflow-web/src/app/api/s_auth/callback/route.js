import { NextResponse } from "next/server"

const response = (message, status) => { // skrot funkcji zwracajacej
    return NextResponse.json({
        message: message,
    }, {status: status})
}

let token = ""
let refreshToken = ""

export const GET = async (req) => { // endpoint GET ktory jest wolany przez spotify przy łączeniu z usługą
    const code = req.url.split("code=")[1]

    try{
        const request = await fetch("https://accounts.spotify.com/api/token", { // fetch wysylajacy zapytanie o otrzymanie tokenu
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&redirect_uri=http://192.168.1.220:3000/api/s_auth/callback&code=${code}`
            
        });

        if(request.ok){
            const data = await request.json();
            token = data.access_token;
            refreshToken = data.refresh_token;
            
            return NextResponse.redirect(new URL('/music/', req.url))
        }else{
            const data = await request.json();

            return NextResponse.redirect(new URL('/music/', req.url))
        }
    }catch(err){
        return NextResponse.redirect(new URL('/music/', req.url))
    }
}

export const POST = async () => { // endpoint POST zwracający nowo powstaly token oraz refreshToken
    if(token != ""){
        const payload = {
            token: token,
            refreshToken: refreshToken
        }
        return response(payload, 200);
    }else{
        return response("Token doesn't exist", 404)
    }
}