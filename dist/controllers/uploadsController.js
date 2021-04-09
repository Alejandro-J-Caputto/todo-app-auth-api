"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageCloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const user_1 = __importDefault(require("../models/user"));
const appErr_1 = require("../utils/appErr");
const catchAsync_1 = require("../utils/catchAsync");
cloudinary_1.default.v2.config(process.env.CLOUDINARY_URL);
exports.uploadImageCloudinary = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { colection } = req.params;
    console.log(colection);
    const { uid } = req.body;
    console.log(uid);
    // console.log(id)
    const validTypes = ['png', 'jpg', 'jpeg'];
    if (req.files.file) {
        const extension = req.files.file.name.split('.');
        if (!validTypes.includes(extension[1])) {
            return next(new appErr_1.AppError('This format is not valid, try with png, jpg or jpeg', 400));
        }
    }
    let model;
    switch (colection) {
        case 'users':
            model = yield user_1.default.findById(uid);
            if (!model) {
                return next(new appErr_1.AppError('This user doesnt exist on DB', 400));
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
    if (model.img) {
        //Delete the image
        const nameCloudinaryURL = model.img.split('/');
        console.log(nameCloudinaryURL);
        const name = nameCloudinaryURL[nameCloudinaryURL.length - 1];
        const [public_id] = name.split('.');
        cloudinary_1.default.v2.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.file;
    console.log(tempFilePath);
    const { secure_url } = yield cloudinary_1.default.v2.uploader.upload(tempFilePath);
    model.img = secure_url;
    yield model.save();
    if (colection === 'users') {
        return res.json({
            user: model,
            url: secure_url
        });
    }
    res.json({
        model: model,
        url: secure_url
    });
}));
