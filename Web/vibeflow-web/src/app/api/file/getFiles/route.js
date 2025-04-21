import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { createConn } from '@/lib/db';

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async () => {
    try{
        const dir = path.join(process.cwd(), 'public/uploads');
        const files = fs.readdirSync(dir);
        console.log(files);
        return response(files, 200);
    }catch(err){
        console.log(`Couldn't get files | ${err}`)
    }
    
}