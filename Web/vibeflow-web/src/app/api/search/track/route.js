import { NextResponse } from "next/server";

const response = (message, status) => { // skrot funkcji zwracajacej
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => { // endpoint POST ktory wyszukuje tresci zwiazane z zapytaniem uzytkownika
    const searchData = await req.json();
    const query = searchData.query;
    const headers = searchData.headers;

    try{
        const request = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=album,artist,playlist,track,show,episode,audiobook&limit=20`, { // fetch wysylajacy zapytanie o otrzymanie tresci ze spotify z konkretnym query
            headers: headers,
            method: "GET"
        })

        if(request.ok){
            const data = await request.json();
            
            return response(data, 200)

        }else{
            const data = await request.json();
            console.log(data);

            return response(data, 404);
        }
    }catch(err){
        console.log(`Couldn't get user's query response | ${err}`);
        return response(err, 500)
    }
}