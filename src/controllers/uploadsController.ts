import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import cloudinary from 'cloudinary'
import { MyReq, UserModel, WorkspaceInterface } from "../interfaces/interfaces";
import User from "../models/user";
import Workspace from "../models/workspace";
import { AppError } from "../utils/appErr";
import { catchAsync } from "../utils/catchAsync";
cloudinary.v2.config(process.env.CLOUDINARY_URL!)


export const uploadImageCloudinary = catchAsync(async(req:MyReq, res: Response, next:NextFunction) => {

  const {colection} = req.params;
  console.log(colection)
  const {uid} = req.body;
  console.log(uid)
  // console.log(id)
  const validTypes = ['png', 'jpg', 'jpeg']
  if(req.files.file) {
    const extension: string [] = req.files.file.name.split('.');

    if(!validTypes.includes(extension[1])) {
      return next( new AppError('This format is not valid, try with png, jpg or jpeg', 400))
    }    
  }



  let model:any;
 
  switch(colection) {
    case 'users': 
      model = await User.findById(uid);

      if(!model) {
        return next(new AppError('This user doesnt exist on DB', 400))
      }
      break;
    // case 'workspace': 
    //   model = await Workspace.findById(id);
    //   console.log(model)
    //   if(!model) {
    //     return next(new AppError('This workspace doesnt exists on DB', 400))
    //   }
    //   break;
    }


    if(model!.img) {
      //Delete the image
      const nameCloudinaryURL = model!.img.split('/');
      console.log(nameCloudinaryURL)
      const name = nameCloudinaryURL[nameCloudinaryURL.length - 1];
      const [public_id] = name.split('.');
      cloudinary.v2.uploader.destroy(public_id)
    }
    const {tempFilePath} = req.files.file;
    console.log(tempFilePath)

    const {secure_url} = await cloudinary.v2.uploader.upload(tempFilePath);

    model!.img = secure_url;

    await model!.save()

    if(colection === 'users') {
      return res.json({
        user: model!,
        url: secure_url
      })
      
    }
      res.json({
        model:model!,
        url: secure_url
      })

})