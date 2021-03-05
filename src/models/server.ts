import express, { Application, NextFunction, Request, Response } from 'express';
import cookie from 'cookie-parser';
import cors from 'cors';
//DB
import connectionDB from '../database/connectionDB';
//Custom Error
import { AppError } from '../utils/appErr';
//Routing
import userRoutes from '../routes/userRoutes'
import authRoutes from '../routes/authRoutes';
import workspaceRoutes from '../routes/workspaceRoutes';
import todoListRoutes from '../routes/todoListRoutes';
import todoRoutes from '../routes/todoRoutes';
import searchRoutes from '../routes/searchRoutes';

class Server {
  
  private app: Application;
  private port: string | number;
  private apiPathEndpoints: {
    users: string,
    userAuth: string,
    boards: string,
    todoList: string,
    todo: string,
    search: string
  } = {
    users: '/api/todoapp/v1/users',
    userAuth: '/api/todoapp/v1/auth',
    boards:'/api/todoapp/v1/workspace',
    todoList: '/api/todoapp/v1/todoList',
    todo: '/api/todoapp/v1/todo',
    search: '/api/todoapp/v1/search'
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
      this.errorHandlingMiddleware();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(cookie());
    this.app.use(express.json());
    this.app.use(express.static('./src/public'));
  }

  routes() {
    
    this.app.use(this.apiPathEndpoints.users, userRoutes);
    this.app.use(this.apiPathEndpoints.userAuth, authRoutes);
    this.app.use(this.apiPathEndpoints.boards, workspaceRoutes);
    this.app.use(this.apiPathEndpoints.todoList, todoListRoutes);
    this.app.use(this.apiPathEndpoints.todo, todoRoutes);
    this.app.use(this.apiPathEndpoints.search, searchRoutes);


    this.app.all('*',(req,res,next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
    })
  }

  async connectionDB(env: string) {
    await connectionDB(env);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port ' + this.port);
    })
  }

  errorHandlingMiddleware() {
    this.app.use((err:AppError, req:Request, res: Response, next:NextFunction) => {
      err.statusCode = err.statusCode || 500;
      err.status = err.status || 'error';
      // if(process.env.ENVIROMENT_NOW === 'development') {
        
      
      // }
      res.status(err.statusCode).json({
        // err: {...err, [err.message]:err.message},
        status: err.status,
        message: err.message
      })
    })
  }
}

export default Server;