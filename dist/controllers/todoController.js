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
exports.deleteTodo = exports.patchTodo = exports.createTodo = exports.getTodoById = exports.getTodo = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const getTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todo_1.default.find();
    res.status(200).json({
        status: 'success',
        todos
    });
});
exports.getTodo = getTodo;
const getTodoById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 'success',
        message: 'Todo created sucesfully',
    });
});
exports.getTodoById = getTodoById;
const createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo, todoList, user } = req.body;
    const newTodo = new todo_1.default({ todo, todoList, user });
    yield newTodo.save();
    res.status(200).json({
        status: 'success',
        newTodo
    });
});
exports.createTodo = createTodo;
const patchTodo = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello from todolist'
    });
};
exports.patchTodo = patchTodo;
const deleteTodo = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello from todolist'
    });
};
exports.deleteTodo = deleteTodo;
