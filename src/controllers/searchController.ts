import { NextFunction, Request, Response } from "express";
import User from '../models/user';
import {Types} from 'mongoose'

import { AppError } from "../utils/appErr";

const allowedColections = [
  'users'
]

const searchUser = async (terminus: any, res: Response) => {
  const keyWord = new RegExp(terminus, 'i');

  const isMongoID = Types.ObjectId.isValid(terminus);
  
  if(isMongoID) {
    console.log('patata')
    const user = await User.findById(terminus);
    return res.status(200).json({
      results: (user) ? [user] : []
    })
  }

  const users = await User.find({
    $or: [{name: keyWord}, {email: keyWord}],
    $and: [{active: {$ne: false}}]
  })
   return res.status(200).json({
    results: users
  })
}

export const searchDoc = (req:Request, res:Response, next:NextFunction) => {
  const {colection, terminus} = req.params;

  if(!allowedColections.includes(colection)) {
    return next( new AppError(`The allowed collections are ${allowedColections}`, 400))
  }

  switch (colection) {
    case 'users':
      
      searchUser(terminus, res)
      break;
    // case 'categories':
    //   searchCategory(terminus, res)
    //   break;      
    // case 'products':
    //   searchProduct(terminus, res)
    //   break;

    default:
     return next(new AppError('This action is not working', 500))
  }
}