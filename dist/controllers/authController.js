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
exports.renewToken = exports.logOut = exports.singIn = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//MODEL
const user_1 = __importDefault(require("../models/user"));
//TOKEN COOKIE
const jwt_cookie_1 = require("../helpers/jwt-cookie");
//ERROR HANDLING
const appErr_1 = require("../utils/appErr");
const catchAsync_1 = require("../utils/catchAsync");
exports.login = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Fields 
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email }).select('+password +active');
    console.log('user');
    if (!user)
        return next(new appErr_1.AppError(`This email ${email} doesnt exist on our DB`, 404));
    if (user.active === false)
        return next(new appErr_1.AppError(`This user is not active anymore`, 404));
    //check if the password matches the stored password in the DB
    if ((yield bcryptjs_1.default.compare(password, user.password)) === false) {
        console.log(password);
        console.log(user.password);
        return next(new appErr_1.AppError(`The password is not correct`, 400));
    }
    const token = yield jwt_cookie_1.generateJWT(user._id);
    yield jwt_cookie_1.generateCOOKIE(token, res);
    res.status(200)
        .json({
        status: 'success',
        message: 'Login sucessfully',
        user,
        token
    });
}));
exports.singIn = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Fields 
    const { name, email, password, passwordConfirm } = req.body;
    const newUser = new user_1.default({ name, email, password, passwordConfirm });
    //Password Encriptation 
    const salt = bcryptjs_1.default.genSaltSync();
    newUser.password = bcryptjs_1.default.hashSync(password, salt);
    yield newUser.save();
    //Generate Token && cookie
    const token = yield jwt_cookie_1.generateJWT(newUser._id);
    yield jwt_cookie_1.generateCOOKIE(token, res);
    res.status(200).json({
        status: 'success',
        message: 'User succesfully created',
        token,
        newUser
    });
}));
exports.logOut = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('jwt-cookie-todo', 'loggedOut', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        status: 'success'
    });
}));
exports.renewToken = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.body;
    const user = yield user_1.default.findById(uid);
    res.status(200).json({
        status: 'success',
        user
    });
}));
