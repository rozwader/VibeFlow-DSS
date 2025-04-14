import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

const response = (message, status) => { // skrot funkcji zwracajacej
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => { // endpoint POST sprawdzający czy token jest nadal poprawny
    const reqPayload = await req.json();
    const usersToken = reqPayload.token;

    const decodedToken = jwt.decode(usersToken);
    
    const tokenExpirationDate = new Date(decodedToken.exp);
    const todaysDate = new Date().getTime();

    if(todaysDate >= tokenExpirationDate){ // sprawdza czy token sie przeterminowal
        return response("Token has expired", 401);
    }

    return response("Token is valid", 200);
}