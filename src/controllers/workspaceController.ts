
import Workspace from '../models/workspace'
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";


export const getWorkspace = catchAsync(async(req:Request, res:Response, next:NextFunction) => {

  const workspace = await Workspace.find().populate('user', 'name email _id').populate('todoLists', 'name -project');
  

  res.status(200).json({
    status: 'success',
    workspace
  })  
})
export const getWorkspaceById = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'hello from workspace'
  })
})
export const createWorkspace = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
  const {title, user} = req.body;
  const newWorkspace = new Workspace({title, user});

  await newWorkspace.save();

  res.status(201).json({
    status: 'success',
    message: `Workspace ${newWorkspace.title} succesfully created`
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