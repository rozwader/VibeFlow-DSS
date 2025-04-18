import { NextResponse } from "next/server"
import { mkdir, writeFile } from "fs/promises"
import path from "path"

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    try{
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file){
            return response("Error | No file", 404);
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(process.cwd(), 'public/uploads', file.name);
        await mkdir(path.dirname(filePath), { recursive: true });
        await writeFile(filePath, buffer);

        return response("File uploaded", 200);
    }catch(err){
        console.log(`Couldn't write new file | ${err}`)
        return response("File not uploaded", 500);
    }
}