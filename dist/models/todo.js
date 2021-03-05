"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.mongo.ObjectID
    },
    todo: {
        type: String,
        required: [true, 'A todo is required'],
        trim: true
    },
    date: {
        type: Date,
        default: new Date().getDate()
    },
    todoList: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'TodoList',
        required: [true, 'A todo must belong to a todolist']
    },
    done: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The todolist belongs to an User']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
const Todo = mongoose_1.model('Todo', TodoSchema);
exports.default = Todo;
