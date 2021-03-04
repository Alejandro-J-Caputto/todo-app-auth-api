"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCOOKIE = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        //Sign the token with the ID as the payload and the private keyword with a expiration date of 1 day!
        jsonwebtoken_1.default.sign(payload, process.env.PRIVATE_TK, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject('The token could not be created');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateJWT = generateJWT;
const generateCOOKIE = (token, res) => {
    return new Promise((resolve, reject) => {
        const cookieOptions = {
            expires: new Date(Date.now()
                + process.env.JWT_COOKIE_EXPIRES_IN
                + 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        resolve(res.cookie('jwt-cookie-todo', token, cookieOptions));
        if (!token) {
            reject('There is a problem with the token');
        }
    });
};
exports.generateCOOKIE = generateCOOKIE;
