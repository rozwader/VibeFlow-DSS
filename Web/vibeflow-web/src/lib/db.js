import mysql from 'mysql2/promise'

let conn;
export const createConn = async () => { // tworzy polaczenie z baza danych
    if(!conn){
        conn = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        })
    }
    return conn;
}