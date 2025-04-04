import { NextResponse } from "next/server";

const response = (message, status) => {
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    const searchData = await req.json();
    const query = searchData.query;

    
    

    return response(query, 200)
}