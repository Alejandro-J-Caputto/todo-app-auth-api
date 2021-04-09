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
exports.deleteTodoList = exports.patchTodoList = exports.getTodoListByBoardAndTodoListId = exports.getTodoListByBoard = exports.createTodoList = exports.getTodoListById = exports.getTodoList = void 0;
const todolist_1 = __importDefault(require("../models/todolist"));
const workspace_1 = __importDefault(require("../models/workspace"));
const catchAsync_1 = require("../utils/catchAsync");
const getTodoList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todoList = yield todolist_1.default.find().populate('project', 'title _id').populate('user', 'name email id').populate('todos', 'todo done');
    res.status(200).json({
        status: 'success',
        todoList
    });
});
exports.getTodoList = getTodoList;
const getTodoListById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const todoList = yield todolist_1.default.find({ project: id }).populate('project', 'title _id').populate('user', 'name email id').populate('todos', 'todo done');
    res.status(200).json({
        status: 'success',
        todoList,
    });
});
exports.getTodoListById = getTodoListById;
const createTodoList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, project, uid } = req.body;
    const newTodoList = new todolist_1.default({ name, project, user: uid });
    yield newTodoList.save();
    res.status(200).json({
        status: 'success',
        message: 'Hello from todolist',
        newTodoList
    });
});
exports.createTodoList = createTodoList;
const getTodoListByBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('patata');
    const { board } = req.params;
    console.log(board);
    //check if workspace exists
    const workspace = yield workspace_1.default.findById(board);
    if (workspace) {
        const todoLists = yield todolist_1.default.find({ project: board });
        res.status(200).json({
            status: 'success',
            todoLists
        });
    }
    //if exits find the todolists
});
exports.getTodoListByBoard = getTodoListByBoard;
exports.getTodoListByBoardAndTodoListId = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { board, todoListId } = req.params;
    //check if workspace exists
    console.log('aaaaaaaa');
    const workspace = yield workspace_1.default.findById(board);
    if (workspace) {
        const todoLists = yield todolist_1.default.findById(todoListId);
        res.status(200).json({
            status: 'success',
            todoLists
        });
    }
}));
const patchTodoList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    console.log('this id', id);
    console.log(name);
    const updatedName = yield todolist_1.default.findByIdAndUpdate(id, { name: name }, { new: true, runValidators: true });
    res.status(200).json({
        status: 'success',
        updatedName
    });
});
exports.patchTodoList = patchTodoList;
const deleteTodoList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const deletedTodoList = yield todolist_1.default.findByIdAndDelete(id);
    console.log(deletedTodoList);
    res.status(200).json({
        status: 'success',
        message: 'todolist sucesfully deleted',
        deletedTodoList
    });
});
exports.deleteTodoList = deleteTodoList;
