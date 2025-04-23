import { NextResponse } from "next/server"

const response = (message, status) => { // skrot funkcji zwracajacej
    return NextResponse.json({
        message: message,
    }, {status: status})
}

const generateRandomString = (len) => { // generuje losowe znaki dla atrybutu state ktorego wymaga spotify api
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const GET = () => { // endpoint GET tworzący link dzieki ktoremu mozna sie polaczyc z spotifyem
    const scope = "streaming \
    user-read-email \
    user-read-private \
    playlist-read-private \
    playlist-read-collaborative \
    playlist-modify-private \
    playlist-modify-public \
    user-follow-modify \
    user-follow-read \
    user-library-modify \
    user-library-read \
    user-top-read \
    user-read-recently-played \
    user-read-playback-state \
    "; // lista pozwolen na ktore musi sie zgodzic uzytkownik aby aplikacja funkcjonowala poprawnie

    const state = generateRandomString(16);

    const auth_query_parameters = new URLSearchParams({ // atrybuty wymagane przez spotify
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: "http://192.168.1.220:3000/api/s_auth/callback",
        state: state,
    })

    return response("https://accounts.spotify.com/authorize/?" + auth_query_parameters.toString(), 200);
}