import { Interface } from "readline";


export interface UserModel {
id: string,
name: string,
email: string,
password: string,
img?: string,
role?: string,
active?: boolean,
google?: boolean
}