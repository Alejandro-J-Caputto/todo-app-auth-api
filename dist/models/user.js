"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.mongo.ObjectID
    },
    name: {
        type: String,
        required: [true, 'The name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid email'],
        unique: true,
        validate: [validator_1.default.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a valis password'],
        select: false
    }, img: {
        type: String
    },
    role: {
        type: String,
        enum: ['USER_ROLE', 'ADMIN', 'EMPLOYEE'],
        default: 'USER_ROLE'
    },
    active: {
        type: Boolean,
        default: true,
        select: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
const User = mongoose_1.model('User', UserSchema);
exports.default = User;
