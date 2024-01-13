import { Pool, QueryResult } from "pg";
import { db as dbCredentials } from "../config";

export interface DbCredentials {
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
}

let pool: Pool;

export const getDatabaseConnectionPool = (credentials: DbCredentials): Pool => {
	if (pool) {
		return pool;
	}
	const newPool = new Pool({
		host: credentials.host,
		port: credentials.port,
		user: credentials.username,
		password: credentials.password,
		database: credentials.database,
		max: 20,
		idleTimeoutMillis: 30000,
		connectionTimeoutMillis: 2000,
	});

	return newPool;
};

export class PostgresDatabaseManager {
	constructor(credentials: DbCredentials) {
		pool = getDatabaseConnectionPool(credentials);
	}

	// declare destrcutor to disconnect from database
	// when the instance is destroyed

	public async connect(): Promise<void> {
		try {
			await pool.connect();
			console.info("Connected to database");
		} catch (error) {
			console.error(error);
		}
	}

	public async disconnect(): Promise<void> {
		try {
			await pool.end();
			console.info("Disconnected from database");
		} catch (error) {
			console.error(error);
		}
	}

	public async query(text: string, params: any[] = []): Promise<QueryResult> {
		try {
			const start = Date.now();
			const result = await pool.query(text, params);
			const duration = Date.now() - start;
			console.info("Executed query:", {
				text,
				duration,
				rows: result.rowCount,
			});
			return result;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

export const db = new PostgresDatabaseManager(dbCredentials);
