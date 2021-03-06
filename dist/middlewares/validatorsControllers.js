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
exports.validateJWT = exports.checkEmailExistsProfile = exports.checkEmailExists = exports.checkResetPass = exports.checkPasswordConfirmation = exports.validateFields = exports.checkPasswordSimple = exports.checkPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const appErr_1 = require("../utils/appErr");
const catchAsync_1 = require("../utils/catchAsync");
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
exports.checkPassword = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, password, passwordReset, passwordConfirm } = req.body;
    console.log(password, passwordReset, passwordConfirm);
    const user = yield user_1.default.findById(uid).select('+password');
    console.log(user === null || user === void 0 ? void 0 : user.password);
    if ((yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password)) === false) {
        console.log('patata');
        return next(new appErr_1.AppError(`The password is not correct`, 400));
    }
    next();
}));
exports.checkPasswordSimple = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, password } = req.body;
    const user = yield user_1.default.findById(uid).select('+password');
    console.log(password);
    console.log(user === null || user === void 0 ? void 0 : user.password);
    if ((yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password)) === false) {
        console.log('patata');
        return next(new appErr_1.AppError(`The password is not correct`, 400));
    }
    next();
}));
const validateFields = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validateFields = validateFields;
const checkPasswordConfirmation = (req, res, next) => {
    const { password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
        return next(new appErr_1.AppError('The provided password and password confirmation doesnt match each other', 400));
    }
    next();
};
exports.checkPasswordConfirmation = checkPasswordConfirmation;
exports.checkResetPass = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { passwordReset, passwordConfirm } = req.body;
    if (passwordReset === passwordConfirm) {
        console.log('AQUI');
        return next();
    }
    else {
        return next(new appErr_1.AppError('The passwords doesnt match with each other', 400));
    }
}));
const checkEmailExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const emailUserExists = yield user_1.default.findOne({ email });
    if (emailUserExists)
        return next(new appErr_1.AppError(`This email already ${email} exists`, 400));
    next();
});
exports.checkEmailExists = checkEmailExists;
const checkEmailExistsProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, uid } = req.body;
        // console.log(email)
        // if(!email) {
        //   next();
        // }
        // if(email) {
        //   const emailUserExists = await User.findOne({email});
        //   if(emailUserExists) return next(new AppError(`This email already ${email} exists`, 400));
        // }
        //It means the user didnt change the current email on the FRONT SIDE
        const emailUserExists = yield user_1.default.findOne({ email, _id: uid });
        // if(emailUserExists && emailUserExists !== email) return next(new AppError(`This email already ${email} exists`, 400));
        if (emailUserExists) {
            return next();
        }
        else {
            //IT MEANS THE USER WANNA CHANGE THE EMAIL 
            const emailInUse = yield user_1.default.findOne({ email });
            //check if the wished email is already in use;
            if (emailInUse) {
                return next(new appErr_1.AppError(`This email already ${email} exists`, 400));
            }
            else {
                next();
            }
        }
        // next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.checkEmailExistsProfile = checkEmailExistsProfile;
exports.validateJWT = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // console.log(req.headers.cookie)
    // console.log(req.cookies)
    // console.log(req.header('Authorization'))
    if (req.header('Authorization')) {
        token = req.header('Authorization').split(' ')[1];
        // console.log(token)
    }
    else if (req.cookies['jwt-cookie']) {
        token = req.cookies['jwt-cookie'];
    }
    if (!token) {
        return next(new appErr_1.AppError('Your are not logged in, please log in and try again', 401));
    }
    // const decodedUserID = await promisify(jwt.verify)(token, process.env.PRIVATEPOTATOE);
    const decodedUserID = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_TK);
    if (!decodedUserID) {
        return next(new appErr_1.AppError('The token is not valid please login again', 400));
    }
    const { uid } = decodedUserID;
    req.body.uid = uid;
    next();
}));
