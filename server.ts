import express from "express";
import { Request, Response } from "express";
import { PORT } from "./config";
import * as db from "./db";

const app = express();

app.get("/", async (req: Request, res: Response) => {
	// const result = await db.client.query("SELECT $1::text as name", ["brianc"]);
	const result = await db.client.query("SELECT * FROM user");
	return res.status(200).json(result.rows);
});

app.listen(PORT, () => {
	db.connect();
	console.log(`Server is listening on port ${PORT}`);
});
