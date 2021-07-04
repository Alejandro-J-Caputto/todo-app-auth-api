import { NextFunction, Request, Response } from "express"
import bcrypt from 'bcryptjs'
import User from '../models/user'
import { catchAsync } from "../utils/catchAsync";




export const getUsers = async (req:Request, res:Response, next:NextFunction) => {

  const { limit = 5, from = 0 } = req.query;
  const users = User.find({active: {$ne : false}}).limit(+limit).skip(+from)
  const total = User.countDocuments();

  const [usersAll, totalCount] = await Promise.all([
    users,
    total

  ])
  res.status(200).json({
    status: 'success',
    usersAll,
    totalCount
  })

}

export const getUserById = catchAsync(async (req:Request, res:  Response, next: NextFunction) => {
  const userId = req.params.id;
  console.log(userId)
  const user = await User.findById(userId);
  if(!user) return next(new Error('There is not an user with the provided ID'))
  res.status(200).json({
    status: 'success',
    message: 'Hello getUsers',
    user
  })
})

// Creates an user without validation. Just use during developing process
export const postUser = async (req:  Request, res:  Response) => {


  let { name, email, password } = req.body;
  const newUser:any = new User({name, email, password});
  
  // ENCRIPTA PASSWORD 
  const salt = bcrypt.genSaltSync();

  newUser.password = bcrypt.hashSync( password, salt);

  // CREATE DOCUMENT IN THE DB
  // await newUser.save();
  await newUser.save();

  res.status(200).json({
    status: 'success',
    message: 'user succesfully created',
    newUser
  })

} 
export const putUser = async (req:  Request, res:  Response) => {

  const {id} = req.params;
  const {password, google, email, ...rest} = req.body;
  const updateTour = await User.findByIdAndUpdate(id, rest, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    updateTour
  })

} 
export const patchUser = async (req:  Request, res:  Response) => {

  console.log('he llegado aqui')

  const {uid,password,...rest} = req.body;
  // if(rest.password) {
  //   const salt = bcrypt.genSaltSync();
  //   rest.password = bcrypt.hashSync(rest.password, salt);
  // }
  
  const updatedUser = await User.findByIdAndUpdate(uid, rest, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    updatedUser
  })

} 
export const patchPassword = async (req:  Request, res:  Response) => {

  console.log('he llegado aqui')

  const {uid,...rest} = req.body;

  if(rest.passwordReset) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(rest.passwordReset, salt);
  }
  const updatedUser = await User.findByIdAndUpdate(uid, rest, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    updatedUser
  })

} 
export const deleteUser = async (req: Request, res:  Response) => {
  // req.body.uid = 123
  // console.log(req.body.uid)
  const changeStatus = await User.findByIdAndUpdate(req.params.id, {active : false}, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    message: 'User have been deleted',
    changeStatus,
    // IT comos by reference in the previous middleware.
    uid : req.body.uid
  })
} 


