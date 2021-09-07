import { Pool, QueryResult } from "pg";
import { environments } from "./environment.util";


export class DatabaseService {
  private static pool: Pool;

  static initialize() {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE } = environments;
    console.log({ DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE });
    DatabaseService.pool = new Pool({
      port: +DB_PORT,
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_DATABASE,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  static async query(sql: string): Promise<QueryResult<any>> {
    console.log("--query called--", sql);
    const client = await DatabaseService.pool.connect();
    let dbRes: QueryResult<any>;
    try {
      await client.query(`SET TIMEZONE='Asia/Singapore'`);
      dbRes = await client.query(sql);
    } finally {
      client.release();
    }
    return dbRes;
  }
}
