import { NextResponse } from "next/server";
import { createConn } from "@/lib/db";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const comparePasswords = (clearPassword, hashedPassword) => { // sprawdza czy nie zahashowane haslo zgadza sie z zahasowanym
    console.log(hashedPassword);
    return bcrypt.compare(clearPassword, hashedPassword).then((res) => {
        return res;
    })
} 

const response = (message, status) => { // funkcja skracająca wiadomosc zwrotna od api
    return NextResponse.json({
        message: message,
    }, {status: status})
}

Date.prototype.addDays = function(days) { // dodanie do Date funkcji addDays
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export const POST = async (req) => { // endpoint POST logujacy uzytkownika
    const usersData = await req.json();

    const username = usersData.username;
    const password = usersData.password;

    try{
        const db = await createConn(); // stworzenie polaczenia z baza danych
        const query = `SELECT password FROM users WHERE username='${username}'`;
        const dbResponse = await db.query(query);

        if (dbResponse[0].length == 0){ // sprawdza czy istnieje uzytkownik o takim Username
            return response("User with this Username or Password doesn't exist", 404);
        }

        const hashedPassword = dbResponse[0][0];
        const passwordValidation = comparePasswords(password, hashedPassword.password);

        if(!passwordValidation){ // jezeli haslo sie nie zgadza zwraca blad 
            return response("User with this Username or Password doesn't exist", 404);
        }

        const issueDate = new Date().getTime();
        const expirationDate = new Date().addDays(30).getTime();

        const token = jwt.sign({username: username, iat: issueDate, exp: expirationDate }, process.env.JWT_SECRET);

        return response(token, 200);
    }catch(err){
        return response(`Couldn't connect to the database | ${err}`, 500);
    }
}