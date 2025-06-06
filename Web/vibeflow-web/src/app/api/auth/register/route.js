import { NextResponse } from "next/server";
import { createConn } from "@/lib/db";
import * as bcrypt from "bcrypt";

const hashPassword = async (password) => { // hashowanie hasla
    return bcrypt.hash(password, 10).then((hash) => {
        return hash;
    })
}

const response = (message, status) => { // skrot funkcji zwracajacej
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => { // endpoint POST rejestrujacy uzytkownika
    const userData = await req.json();

    const username = userData.username;
    const password = userData.password;
    const email = userData.email;

    try{
        const db = await createConn(); // tworzenie polaczenia z baza danych
        let query = `SELECT id FROM users WHERE username='${username}'`;
        let dbResponse = await db.query(query);

        if(dbResponse[0].length != 0){ // sprawdza czy nazwa uzytkownika jest wolna
            return response("User with that Username already exists", 403);
        }

        const hashedPassword = await hashPassword(password);

        const newDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        query = `INSERT INTO users(username, password, email, createdAt) VALUES ('${username}','${hashedPassword}','${email}','${newDate}')`;
        dbResponse = await db.query(query); // tworzy uzytkownika w bazie danych

        return response("Registered user successfully", 200);
    }catch(err){
        return response(`Couldn't connect to the database | ${err}`, 500);
    }

}