import { NextResponse } from "next/server"

const response = (message, status) => {
    return NextResponse.json({
        message: message,
    }, {status: status})
}

let token = "";

export const POST = async (req) => {
    const requestData = await req.json();

    token = requestData.token;

    response("Token saved", 200);
}

export const GET = () => {
    if (token != ""){
        response(token, 200);
    }else{
        response(null, 404);
    }
}