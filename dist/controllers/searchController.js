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
exports.searchDoc = void 0;
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = require("mongoose");
const appErr_1 = require("../utils/appErr");
const allowedColections = [
    'users'
];
const searchUser = (terminus, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyWord = new RegExp(terminus, 'i');
    const isMongoID = mongoose_1.Types.ObjectId.isValid(terminus);
    if (isMongoID) {
        console.log('patata');
        const user = yield user_1.default.findById(terminus);
        return res.status(200).json({
            results: (user) ? [user] : []
        });
    }
    const users = yield user_1.default.find({
        $or: [{ name: keyWord }, { email: keyWord }],
        $and: [{ active: { $ne: false } }]
    });
    return res.status(200).json({
        results: users
    });
});
const searchDoc = (req, res, next) => {
    const { colection, terminus } = req.params;
    if (!allowedColections.includes(colection)) {
        return next(new appErr_1.AppError(`The allowed collections are ${allowedColections}`, 400));
    }
    switch (colection) {
        case 'users':
            searchUser(terminus, res);
            break;
        // case 'categories':
        //   searchCategory(terminus, res)
        //   break;      
        // case 'products':
        //   searchProduct(terminus, res)
        //   break;
        default:
            return next(new appErr_1.AppError('This action is not working', 500));
    }
};
exports.searchDoc = searchDoc;
