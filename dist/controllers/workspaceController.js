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
const mongoose_1 = require("mongoose");
const getWorkspace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.body;
        console.log('possible error', uid);
        if (mongoose_1.Types.ObjectId.isValid(uid)) {
            console.log('checked uid', uid);
        }
        console.log('uid', req.headers.authorization);
        const workspace = yield workspace_1.default.find({ user: uid }).populate('user', 'name email _id').populate('todoLists', 'name -project _id');
        // const workspace = await Workspace.find({user:req.headers.authorization}).populate('user', 'name email _id').populate('todoLists', 'name -project _id');
        // const workspace = await Workspace.find().populate('user', 'name email _id');
        // console.log(typeof uid)
        console.log(workspace);
        res.status(200).json({
            status: 'success',
            workspace
        });
    }
    catch (err) {
        console.log('catch', err);
        next(err);
    }
});
exports.getWorkspace = getWorkspace;
exports.getWorkspaceById = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 'success',
        message: 'hello from workspace'
    });
}));
exports.createWorkspace = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { title, img, uid } = req.body;
    const newWorkspace = new workspace_1.default({ title, img, user: uid });
    console.log(newWorkspace);
    yield newWorkspace.save();
    const workspace = yield workspace_1.default.find({ user: uid }).populate('user', 'name email _id').populate('todoLists', 'name -project');
    res.status(201).json({
        status: 'success',
        message: `Workspace ${newWorkspace.title} succesfully created`,
        workspace
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
