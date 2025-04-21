import { NextResponse } from "next/server"
import { mkdir, writeFile } from "fs/promises"
import { createConn } from "@/lib/db"
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
        const name = formData.get("name");
        const artist = formData.get("artist");
        const user = formData.get('user');

        if (!file){
            return response("Error | No file", 404);
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        try{
            const db = await createConn(); // stworzenie polaczenia z baza danych

            const doesFileExistsQ = `SELECT name FROM files WHERE fileName='${file.name}'`;
            const doesFileExists = await db.query(doesFileExistsQ);

            if(doesFileExists[0].length == 0){
                const nowDate = new Date.now();
                const query = `INSERT INTO files(name, artist, fileName, platform, createdAt, creator) VALUES ('${name}','${artist}','${file.name}','0','${nowDate}','${user}')`;
                const dbResponse = await db.query(query);

                const filePath = path.join(process.cwd(), 'public/uploads', file.name);
                await mkdir(path.dirname(filePath), { recursive: true });
                await writeFile(filePath, buffer);
            }else{
                return response("File already exists", 403);
            }

            console.log("db success");
        }catch(err){
            console.log(`Db Failure | ${err}`);
        }
        

        return response("File uploaded", 200);
    }catch(err){
        console.log(`Couldn't write new file | ${err}`)
        return response("File not uploaded", 500);
    }
}