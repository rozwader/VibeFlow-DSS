import { NextResponse } from "next/server";
import { createConn } from "@/lib/db";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const comparePasswords = (clearPassword, hashedPassword) => {
    return bcrypt.compare(clearPassword, hashedPassword).then((res) => {
        return res;
    })
} 

const response = (message, status) => {
    return NextResponse.json({
        message: message,
    }, {status: status})
}

export const POST = async (req) => {
    const usersData = await req.json();

    const username = usersData.username;
    const password = usersData.password;

    try{
        const db = await createConn();
        const query = `SELECT password FROM users WHERE username='${username}'`;
        const dbResponse = await db.query(query);

        if (dbResponse[0].length == 0){
            return response("User with this Username or Password doesn't exist", 404);
        }

        const hashedPassword = dbResponse[0][0];
        const passwordValidation = comparePasswords(password, hashedPassword);

        if(!passwordValidation){
            return response("User with this Username or Password doesn't exist", 404);
        }

        const token = jwt.sign({username: username}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return response(token, 200);
    }catch(err){
        return response(`Couldn't connect to the database | ${err}`, 500);
    }
}