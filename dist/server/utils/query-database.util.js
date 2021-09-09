"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const pg_1 = require("pg");
const environment_util_1 = require("./environment.util");
class DatabaseService {
    static initialize() {
        const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE } = environment_util_1.environments;
        console.log({ DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE });
        DatabaseService.pool = new pg_1.Pool({
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
    static query(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("--query called--", sql);
            const client = yield DatabaseService.pool.connect();
            let dbRes;
            try {
                yield client.query(`SET TIMEZONE='Asia/Singapore'`);
                dbRes = yield client.query(sql);
            }
            finally {
                client.release();
            }
            return dbRes.rows || [];
        });
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=query-database.util.js.map