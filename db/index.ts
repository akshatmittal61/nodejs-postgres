import { Client } from "pg";
import { db } from "../config";

const client = new Client({
	host: db.host,
	port: db.port,
	user: db.username,
	password: db.password,
	database: db.database,
});

const connect = async () => {
	try {
        await client.connect();
        console.info("Connected to database");
	} catch (err) {
        console.error("Error connecting to database", err);
	}
};

const disconnect = async () => {
	try {
        await client.end();
        console.info("Disconnected from database");
	} catch (err) {
		console.error("Error disconnecting from database", err);
	}
};

export { connect, disconnect, client };
