import express, { Request, Response } from "express";
import { PORT } from "./config";
import { db } from "./db";
import { initDb } from "./db/init";
import routes from "./routes";
import log from "./log";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_: Request, res: Response) => {
	return res.status(200).json({
		message: "Server is running",
	});
});

app.use("/api/v1", routes);

app.listen(PORT, () => {
	db.connect();
	initDb();
	log.info(`Server is listening on port ${PORT}`);
});
