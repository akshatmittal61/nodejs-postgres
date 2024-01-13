import { db } from ".";
import log from "../log";

export const initDb = async () => {
    try {
        const res = await db.query(
            `CREATE TABLE IF NOT EXISTS blogs (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                body TEXT NOT NULL,
                author VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW()
            )`
        );
        log.info("Table created successfully");
        return res;
    } catch (error: any) {
        log.error("Error connecting to database");
        log.error(error);
    }
};
