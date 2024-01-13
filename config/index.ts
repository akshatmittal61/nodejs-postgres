import { config } from "dotenv";

config();

class ConfigService {
	constructor(private env: { [k: string]: string | undefined }) {}

	public get(key: string): string {
		if (!this.env[key]) {
			throw new Error(`Key ${key} not found in environment`);
		}

		return this.env[key] as string;
	}

	public getNumber(key: string): number {
		if (!this.env[key]) {
			throw new Error(`Key ${key} not found in environment`);
		}

		return Number(this.env[key]);
	}

	public getBoolean(key: string): boolean {
		if (!this.env[key]) {
			throw new Error(`Key ${key} not found in environment`);
		}

		return this.env[key] === "true";
	}
}

const configService = new ConfigService(process.env);

export default configService;

export const PORT = configService.getNumber("PORT");

export const db = {
	host: configService.get("POSTGRES_HOST"),
	port: configService.getNumber("POSTGRES_PORT"),
	username: configService.get("POSTGRES_USERNAME"),
	password: configService.get("POSTGRES_PASSWORD"),
	database: configService.get("POSTGRES_DATABASE"),
};
