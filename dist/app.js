"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
// dotenv.config({path: '../src/config/.env'});
dotenv_1.default.config({ path: './src/config/config.env' });
// console.log(typeof process.env.PORT)
const server = new server_1.default();
server.listen();
