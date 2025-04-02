import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

const response = (message, status) => {
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    const reqPayload = await req.json();
    const usersToken = reqPayload.token;

    const decodedToken = jwt.decode(usersToken);
    
    const tokenExpirationDate = new Date(decodedToken.exp);
    const todaysDate = new Date().getTime();

    if(todaysDate >= tokenExpirationDate){
        return response("Token has expired", 401);
    }

    return response("Token is valid", 200);
}