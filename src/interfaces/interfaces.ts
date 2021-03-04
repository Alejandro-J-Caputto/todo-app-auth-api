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

// export interface AuthUid extends JwtHeader {
//   uid?:string;
// }