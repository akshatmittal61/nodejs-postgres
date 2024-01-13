import { db } from ".";

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
        console.info("Table created successfully");
        return res;
    } catch (error) {
        console.error("Error connecting to database");
        console.error(error);
    }
};
