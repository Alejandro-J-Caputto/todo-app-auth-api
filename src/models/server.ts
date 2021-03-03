import express, { Application } from 'express';

import cors from 'cors';
import connectionDB from '../database/connectionDB';

import userRoutes from '../routes/userRoutes'
import { getUsers } from '../controllers/userController';

class Server {
  
  private app: Application;
  private port: string | number;
  private apiPathEndpoints: {
    users: string,
    userAuth: string
  } = {
    users: '/api/todoapp/v1/users',
    userAuth: '/api/todoapp/v1/auth'
  }
  
  constructor() {
      //Init express
      this.app = express();
      //Selected port to run the app locally && endpoints.
      this.port = process.env.PORT || '8080';

      this.apiPathEndpoints;
      this.connectionDB(process.env.ENVIROMENT!);
      this.middlewares();
      this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('./src/public'));
  }

  routes() {
    
    this.app.use(this.apiPathEndpoints.users, userRoutes)

  }

  async connectionDB(env: string) {
    await connectionDB(env);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port ' + this.port);
    })
  }
}

export default Server;