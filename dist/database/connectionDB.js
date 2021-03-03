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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
//Run enviroment variables;
dotenv_1.default.config({ path: './src/config/config.env' });
const connectionDB = (env) => __awaiter(void 0, void 0, void 0, function* () {
    let connectionURI = env === 'development' ? process.env.DATABASE_LOCAL : process.env.DATABASE_MONGO;
    console.log(connectionURI);
    try {
        yield mongoose_1.default.connect(connectionURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log(`Database online on ${env} mode`);
    }
    catch (error) {
        throw new Error('Error connecting to the database');
    }
});
exports.default = connectionDB;
