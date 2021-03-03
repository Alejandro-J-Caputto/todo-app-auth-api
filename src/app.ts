
import dotenv from 'dotenv'
import Server from './models/server'

// dotenv.config({path: '../src/config/.env'});
dotenv.config({path: './src/config/config.env'});


// console.log(typeof process.env.PORT)

const server = new Server()

server.listen();