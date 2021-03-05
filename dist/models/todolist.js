"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoListSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.mongo.ObjectID
    },
    name: {
        type: String,
        required: [true, 'A name fot the current list is required'],
        trim: true
    },
    date: {
        type: Date,
        default: new Date().getDate()
    },
    active: {
        type: Boolean,
        default: true
    },
    // todos: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'Todo',
    // }],
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: [true, 'A todolist must belong to a workspace']
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The todolist belongs to an User']
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
TodoListSchema.virtual('todos', {
    ref: 'Todo',
    foreignField: 'todoList',
    localField: '_id'
});
const TodoList = mongoose_1.model('TodoList', TodoListSchema);
exports.default = TodoList;
