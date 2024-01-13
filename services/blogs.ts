import { db } from "../db";

export const findAll = async () => {
    try {
        const res = await db.query("SELECT * FROM blogs");
        return res.rows;
    }
    catch (error) {
        console.error("Error finding blogs");
        console.error(error);
    }
};

export const findById = async (id: number | string) => {
    try {
        const res = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);
        return res.rows[0];
    }
    catch (error) {
        console.error(`Error finding blog with id ${id}`);
        console.error(error);
    }
};

export const create = async (title: string, body: string, author: string) => {
    try {
        const res = await db.query(
            "INSERT INTO blogs (title, body, author) VALUES ($1, $2, $3) RETURNING *",
            [title, body, author]
        );
        return res.rows[0];
    }
    catch (error) {
        console.error("Error creating blog");
        console.error(error);
    }
};

export const update = async (id: number | string, title: string, body: string, author: string) => {
    try {
        const res = await db.query(
            "UPDATE blogs SET title = $1, body = $2, author = $3 WHERE id = $4 RETURNING *",
            [title, body, author, id]
        );
        return res.rows[0];
    }
    catch (error) {
        console.error(`Error updating blog with id ${id}`);
        console.error(error);
    }
};

export const remove = async (id: number | string) => {
    try {
        const res = await db.query("DELETE FROM blogs WHERE id = $1", [id]);
        return res.rows[0];
    }
    catch (error) {
        console.error(`Error deleting blog with id ${id}`);
        console.error(error);
    }
};

export const search = async (query: string) => {
    try {
        const res = await db.query(
            "SELECT * FROM blogs WHERE title ILIKE $1 OR body ILIKE $1 OR author ILIKE $1",
            [`%${query}%`]
        );
        return res.rows;
    }
    catch (error) {
        console.error(`Error searching blogs for ${query}`);
        console.error(error);
    }
}