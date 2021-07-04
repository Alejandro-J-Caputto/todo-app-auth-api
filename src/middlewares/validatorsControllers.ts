import { NextFunction, Request, Response } from "express"
import bcryptjs from 'bcryptjs';

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

export const checkPassword = catchAsync(async (req:Request, res:Response , next: NextFunction) => {
  const {uid, password, passwordReset, passwordConfirm} = req.body;
  console.log(password, passwordReset, passwordConfirm)
  const user = await User.findById(uid).select('+password');

  console.log(user?.password)
  if(await bcryptjs.compare(password, user?.password!) === false) {
    console.log('patata')
    return next(new AppError(`The password is not correct`, 400));
  }

  next();
})
export const checkPasswordSimple = catchAsync(async (req:Request, res:Response , next: NextFunction) => {
  const {uid, password} = req.body;

  const user = await User.findById(uid).select('+password');
  console.log(password)
  console.log(user?.password)
  if(await bcryptjs.compare(password, user?.password!) === false) {
    console.log('patata')
    return next(new AppError(`The password is not correct`, 400));
  }

  next();
})

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
export const checkResetPass = catchAsync(async (req:Request, res:Response , next: NextFunction) => {

  const { passwordReset, passwordConfirm} = req.body;

  if(passwordReset === passwordConfirm) {
    console.log('AQUI')
    return next();
  } else {
    return next(new AppError('The passwords doesnt match with each other', 400))
  }

})
export const checkEmailExists = async (req:Request, res:Response , next: NextFunction) => {
  const {email} = req.body;

  const emailUserExists = await User.findOne({email});

  if(emailUserExists) return next(new AppError(`This email already ${email} exists`, 400));

  next();

}
export const checkEmailExistsProfile = async (req:Request, res:Response , next: NextFunction) => {
  try {
    const {email,uid} = req.body;
  // console.log(email)
  // if(!email) {
  //   next();
  // }

  // if(email) {
  //   const emailUserExists = await User.findOne({email});
  //   if(emailUserExists) return next(new AppError(`This email already ${email} exists`, 400));
  // }


  //It means the user didnt change the current email on the FRONT SIDE
  const emailUserExists = await User.findOne({email, _id: uid});

  // if(emailUserExists && emailUserExists !== email) return next(new AppError(`This email already ${email} exists`, 400));
  if(emailUserExists) {
    return next();
  } else {
    //IT MEANS THE USER WANNA CHANGE THE EMAIL 
    const emailInUse = await User.findOne({email});
      //check if the wished email is already in use;
      if(emailInUse) {  
        return next(new AppError(`This email already ${email} exists`, 400));  
      } else {
        next();
      }
  }
  // next();
  } catch (error) {
    console.log(error)
  }
  

}

export const validateJWT = catchAsync(async (req:Request, res:Response , next: NextFunction) => {
  let token;
  // console.log(req.headers.cookie)
  // console.log(req.cookies)
  // console.log(req.header('Authorization'))
  if(req.header('Authorization')) {
    token = req.header('Authorization')!.split(' ')[1];
    // console.log(token)
  } else if (req.cookies['jwt-cookie']) {
    token = req.cookies['jwt-cookie'];
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
