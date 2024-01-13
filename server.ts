import express, { Request, Response } from "express";
import { PORT } from "./config";
import { db } from "./db";
import { initDb } from "./db/init";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
	// const result = await db.query("SELECT $1::text as name", ["brianc"]);
	const result = await db.query("SELECT * FROM user");
	return res.status(200).json(result.rows);
});

app.use("/api/v1", routes);

app.listen(PORT, () => {
	db.connect();
	initDb();
	console.log(`Server is listening on port ${PORT}`);
});
