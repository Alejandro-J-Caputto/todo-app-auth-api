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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.patchPassword = exports.patchUser = exports.putUser = exports.postUser = exports.getUserById = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const catchAsync_1 = require("../utils/catchAsync");
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 5, from = 0 } = req.query;
    const users = user_1.default.find({ active: { $ne: false } }).limit(+limit).skip(+from);
    const total = user_1.default.countDocuments();
    const [usersAll, totalCount] = yield Promise.all([
        users,
        total
    ]);
    res.status(200).json({
        status: 'success',
        usersAll,
        totalCount
    });
});
exports.getUsers = getUsers;
exports.getUserById = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    console.log(userId);
    const user = yield user_1.default.findById(userId);
    if (!user)
        return next(new Error('There is not an user with the provided ID'));
    res.status(200).json({
        status: 'success',
        message: 'Hello getUsers',
        user
    });
}));
// Creates an user without validation. Just use during developing process
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password } = req.body;
    const newUser = new user_1.default({ name, email, password });
    // ENCRIPTA PASSWORD 
    const salt = bcryptjs_1.default.genSaltSync();
    newUser.password = bcryptjs_1.default.hashSync(password, salt);
    // CREATE DOCUMENT IN THE DB
    // await newUser.save();
    yield newUser.save();
    res.status(200).json({
        status: 'success',
        message: 'user succesfully created',
        newUser
    });
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { password, google, email } = _a, rest = __rest(_a, ["password", "google", "email"]);
    const updateTour = yield user_1.default.findByIdAndUpdate(id, rest, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        updateTour
    });
});
exports.putUser = putUser;
const patchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('he llegado aqui');
    const _b = req.body, { uid, password } = _b, rest = __rest(_b, ["uid", "password"]);
    // if(rest.password) {
    //   const salt = bcrypt.genSaltSync();
    //   rest.password = bcrypt.hashSync(rest.password, salt);
    // }
    const updatedUser = yield user_1.default.findByIdAndUpdate(uid, rest, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        updatedUser
    });
});
exports.patchUser = patchUser;
const patchPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('he llegado aqui');
    const _c = req.body, { uid } = _c, rest = __rest(_c, ["uid"]);
    if (rest.passwordReset) {
        const salt = bcryptjs_1.default.genSaltSync();
        rest.password = bcryptjs_1.default.hashSync(rest.passwordReset, salt);
    }
    const updatedUser = yield user_1.default.findByIdAndUpdate(uid, rest, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        updatedUser
    });
});
exports.patchPassword = patchPassword;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req.body.uid = 123
    // console.log(req.body.uid)
    const changeStatus = yield user_1.default.findByIdAndUpdate(req.params.id, { active: false }, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        message: 'User have been deleted',
        changeStatus,
        // IT comos by reference in the previous middleware
        uid: req.body.uid
    });
});
exports.deleteUser = deleteUser;
