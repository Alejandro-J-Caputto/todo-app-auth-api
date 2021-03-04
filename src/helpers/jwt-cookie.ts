import { Response } from 'express';
import jwt from 'jsonwebtoken';


export const generateJWT= (uid:string) => {
  return new Promise<string>((resolve, reject) => {
    const payload = {uid};
    //Sign the token with the ID as the payload and the private keyword with a expiration date of 1 day!
    jwt.sign(payload, process.env.PRIVATE_TK!, {
      expiresIn: '24h'
    }, (err, token) => {
      if( err ) {
        reject('The token could not be created')
      } else {
        resolve(token!)
      }
    })
  })
}


export const generateCOOKIE = (token:string, res: Response) => {
  return new Promise((resolve, reject) => {
    const cookieOptions = {
      expires: new Date(Date.now()
      + process.env.JWT_COOKIE_EXPIRES_IN!
      + 24 * 60 * 60 * 1000),
      httpOnly: true
    }

    resolve(res.cookie('jwt-cookie-todo', token, cookieOptions))
    if(!token) {
      reject('There is a problem with the token')
    }
  })
}