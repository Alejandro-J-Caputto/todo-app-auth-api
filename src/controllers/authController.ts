import bcryptjs from 'bcryptjs';
//MODEL
import User from '../models/user';
//TYPES
import { NextFunction, Request, Response } from 'express';
//TOKEN COOKIE
import { generateCOOKIE, generateJWT } from '../helpers/jwt-cookie';
//ERROR HANDLING
import { AppError } from '../utils/appErr';
import { catchAsync } from '../utils/catchAsync';





export const login = catchAsync(async(req:Request, res:Response, next: NextFunction) => {

  //Fields 

  const {email, password} = req.body;

  const user = await User.findOne({email}).select('+password +active');
  console.log('user')
  if(!user) return next(new AppError(`This email ${email} doesnt exist on our DB`, 404));

  if(user.active === false) return next(new AppError(`This user is not active anymore`, 404));
  //check if the password matches the stored password in the DB
  if(await bcryptjs.compare(password, user.password!) === false) {
    console.log(password)
    console.log(user.password)
    return next(new AppError(`The password is not correct`, 400));
  }

  const token = await generateJWT(user._id);

  await generateCOOKIE(token, res);

  res.status(200)
    .json({
      status: 'success',
      message: 'Login sucessfully',
      user,
      token
    })
})

export const singIn = catchAsync(async(req:Request, res: Response, next: NextFunction) => {

  //Fields 
  const { name, email, password, passwordConfirm } = req.body;

  const newUser = new User({name, email, password, passwordConfirm});

  //Password Encriptation 
  const salt = bcryptjs.genSaltSync();
  newUser.password = bcryptjs.hashSync(password, salt);

  await newUser.save()

  //Generate Token && cookie
  const token = await generateJWT(newUser._id);
  await generateCOOKIE(token, res);

  res.status(200).json({
    status: 'success',
    message: 'User succesfully created',
    token,
    newUser
  })

})

export const logOut = catchAsync(async(req:Request, res: Response, next: NextFunction) => {
  
  res.cookie('jwt-cookie-todo', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({
      status: 'success'
  })
})

export const renewToken = catchAsync(async(req:Request, res: Response, next: NextFunction) => {

  const { uid }= req.body;

  const user = await User.findById(uid);

  res.status(200).json({
    status: 'success',
    user
  })


})