import {Document} from 'mongoose'
import {Request} from 'express'
import jwt, { JwtHeader } from 'jsonwebtoken';



export interface UserModel extends Document {
id?: string,
name?: string,
email?: string,
password?: string,
img?: string,
role?: string,
active?: boolean,
google?: boolean
}

export interface WorkspaceInterface extends Document {
  id?:string,
  title?:string,
  date?: string,
  todoLists?: string[],
  user?: string,
  img?:string
}

export interface TodoListInterface extends Document {
id?:string,
name?:string,
date?:string,
active?:string,
todos?:string[],
project?:string,
user?:string,
}
export interface TodoInterface extends Document {
id?:string,
todo?:string,
date?:string,
todoList?:string,
done?:boolean,
user?:string,
}

// export interface AuthUid extends JwtHeader {
//   uid?:string;
// }

export interface MyReq extends Request {
  files?: any;
  file?: any;
}