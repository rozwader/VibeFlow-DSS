import { NextResponse } from "next/server"

const response = (message, status) => {
    return NextResponse.json({
        message: message,
    }, {status: status})
}

const generateRandomString = (len) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const GET = () => {
    const scope = "streaming \
    user-read-email \
    user-read-private";

    const state = generateRandomString(16);

    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: "http://localhost:3000/api/s_auth/callback",
        state: state,
    })

    return response("https://accounts.spotify.com/authorize/?" + auth_query_parameters.toString(), 200);
}