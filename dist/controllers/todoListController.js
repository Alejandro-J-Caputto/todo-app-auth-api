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
const getTodoList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todoList = yield todolist_1.default.find().populate('project', 'title _id').populate('user', 'name email id').populate('todos', 'todo done');
    res.status(200).json({
        status: 'success',
        todoList
    });
});
exports.getTodoList = getTodoList;
const getTodoListById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 'success',
        message: 'TodoList created sucesfully',
    });
});
exports.getTodoListById = getTodoListById;
const createTodoList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, project, user } = req.body;
    const newTodoList = new todolist_1.default({ name, project, user });
    yield newTodoList.save();
    res.status(200).json({
        status: 'success',
        message: 'Hello from todolist',
        newTodoList
    });
});
exports.createTodoList = createTodoList;
const getTodoListByBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { board } = req.params;
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
const getTodoListByBoardAndTodoListId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { board, todoListId } = req.params;
    //check if workspace exists
    const workspace = yield workspace_1.default.findById(board);
    if (workspace) {
        const todoLists = yield todolist_1.default.findById(todoListId);
        res.status(200).json({
            status: 'success',
            todoLists
        });
    }
});
exports.getTodoListByBoardAndTodoListId = getTodoListByBoardAndTodoListId;
const patchTodoList = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello from todolist'
    });
};
exports.patchTodoList = patchTodoList;
const deleteTodoList = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello from todolist'
    });
};
exports.deleteTodoList = deleteTodoList;
