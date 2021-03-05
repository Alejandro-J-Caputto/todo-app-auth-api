import { NextFunction, Request, Response } from "express"
import {validationResult} from 'express-validator';
import jwt from "jsonwebtoken";

import User from "../models/user";
import { AppError } from "../utils/appErr";
import { catchAsync } from "../utils/catchAsync";


// export const checkRequiredFields = (req:Request, res:Response , next: NextFunction) => {
//   const errors:string[] = []
//   const {name, email, password, passwordConfirm} = req.body;

//   if()
 
//   if( errors.length ) {
//     return res.status(400).json({
//       status: 'fail',
//       errors
//     })
//   }
//   next();
// }


export const validateFields = ( req:Request, res:Response , next: NextFunction ) => {

  const errors = validationResult(req);
  if( !errors.isEmpty() ){
      return res.status(400).json(errors);

  }

  next();
}
export const checkPasswordConfirmation = (req:Request, res:Response , next: NextFunction) => {
  const {password, passwordConfirm} = req.body;
  if(password !== passwordConfirm) {
    return next(new AppError('The provided password and password confirmation doesnt match each other', 400))
  }
  next();
}

export const checkEmailExists = async (req:Request, res:Response , next: NextFunction) => {
  const {email} = req.body;

  const emailUserExists = await User.findOne({email});

  if(emailUserExists) return next(new AppError(`This email already ${email} exists`, 400));

  next();

}

export const validateJWT = catchAsync(async (req:Request, res:Response , next: NextFunction) => {
  let token;
  // console.log(req.headers.cookie)
  // console.log(req.cookies)
  if(req.header('Authorization')) {
    token = req.header('Authorization')!.split(' ')[1];
  } else if (req.cookies['jwt-cookie']) {
    token = req.cookies['jwt-cookie']
  }
  if(!token) {
    return next(new AppError('Your are not logged in, please log in and try again', 401))
  }
  // const decodedUserID = await promisify(jwt.verify)(token, process.env.PRIVATEPOTATOE);
  const decodedUserID:any = jwt.verify(token, process.env.PRIVATE_TK!)
  if(!decodedUserID) {
    return next(new AppError('The token is not valid please login again', 400));
  }
  const { uid } = decodedUserID;
  req.body.uid = uid;
  next();
} )
