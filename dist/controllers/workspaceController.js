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
exports.deleteWorkspace = exports.patchWorkspace = exports.createWorkspace = exports.getWorkspaceById = exports.getWorkspace = void 0;
const workspace_1 = __importDefault(require("../models/workspace"));
const catchAsync_1 = require("../utils/catchAsync");
exports.getWorkspace = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const workspace = yield workspace_1.default.find().populate('user', 'name email _id').populate('todoLists', 'name -project');
    res.status(200).json({
        status: 'success',
        workspace
    });
}));
exports.getWorkspaceById = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 'success',
        message: 'hello from workspace'
    });
}));
exports.createWorkspace = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, user } = req.body;
    const newWorkspace = new workspace_1.default({ title, user });
    yield newWorkspace.save();
    res.status(201).json({
        status: 'success',
        message: `Workspace ${newWorkspace.title} succesfully created`
    });
}));
exports.patchWorkspace = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 'success',
        message: 'hello from workspace'
    });
}));
exports.deleteWorkspace = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 'success',
        message: 'hello from workspace'
    });
}));
