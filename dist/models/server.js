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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connectionDB_1 = __importDefault(require("../database/connectionDB"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
class Server {
    constructor() {
        this.apiPathEndpoints = {
            users: '/api/todoapp/v1/users',
            userAuth: '/api/todoapp/v1/auth'
        };
        //Init express
        this.app = express_1.default();
        //Selected port to run the app locally && endpoints.
        this.port = process.env.PORT || '8080';
        this.apiPathEndpoints;
        this.connectionDB(process.env.ENVIROMENT);
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('./src/public'));
    }
    routes() {
        this.app.use(this.apiPathEndpoints.users, userRoutes_1.default);
    }
    connectionDB(env) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connectionDB_1.default(env);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }
}
exports.default = Server;
