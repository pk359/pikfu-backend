export interface IServerEnvironment {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASS: string;
    DB_DATABASE: string;
    JWT_SECRET: string;
}
