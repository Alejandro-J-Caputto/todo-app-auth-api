
import Workspace from '../models/workspace'
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import {Types} from 'mongoose'
import { types } from 'util';



export const getWorkspace = async(req:Request, res:Response, next:NextFunction) => {
  try {

    const {uid} = req.body
    console.log('possible error',uid)
    if(Types.ObjectId.isValid(uid)){
      console.log('checked uid', uid)
    }
    console.log('uid',req.headers.authorization)
    const workspace = await Workspace.find({user:uid}).populate('user', 'name email _id').populate('todoLists', 'name -project _id');
    // const workspace = await Workspace.find({user:req.headers.authorization}).populate('user', 'name email _id').populate('todoLists', 'name -project _id');
    // const workspace = await Workspace.find().populate('user', 'name email _id');
    // console.log(typeof uid)
    console.log(workspace)
    res.status(200).json({
      status: 'success',
      workspace
    })  
  } catch (err) {
    console.log('catch', err)
    next(err);
  }
}
export const getWorkspaceById = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'hello from workspace'
  })
})
export const createWorkspace = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
  console.log(req.body)
  const {title, img , uid} = req.body;
  const newWorkspace = new Workspace({title, img ,user: uid});

  console.log(newWorkspace)
  await newWorkspace.save();

  const workspace = await Workspace.find({user:uid}).populate('user', 'name email _id').populate('todoLists', 'name -project');

  res.status(201).json({
    status: 'success',
    message: `Workspace ${newWorkspace.title} succesfully created`,
    workspace
  })
})
export const patchWorkspace = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'hello from workspace'
  })
})
export const deleteWorkspace = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'hello from workspace'
  })
})