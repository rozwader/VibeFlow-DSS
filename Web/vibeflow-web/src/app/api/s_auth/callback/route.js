import { NextResponse } from "next/server"

const response = (message, status) => {
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const GET = async (req) => {
    const code = req.url.split("code=")[1]

    const authOptions = {
        form: {
            code: code,
            redirect_uri: "http://localhost:3000/api/s_auth/callback",
            grant_type: "authorization_code",
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        json: true,
    };

    try{
        const request = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&redirect_uri=http://localhost:3000/api/s_auth/callback&code=${code}`
            
        });

        if(request.ok){
            const data = await request.json();
            const access_token = data.access_token;
            console.log(access_token);

            // trzeba znalezc sposob jak zapisac token po client-side

            return NextResponse.redirect(new URL('/music/', req.url))
        }else{
            const data = await request.json();
            console.log(data);
            return NextResponse.redirect(new URL('/music/', req.url))
        }
    }catch(err){
        return NextResponse.redirect(new URL('/music/', req.url))
    }
}
