"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WorkspaceSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.mongo.ObjectID,
    },
    title: {
        type: String,
        required: [true, 'A title is required']
    },
    date: {
        type: Date,
        default: new Date().getDate()
    },
    img: {
        type: String,
        required: [true, 'A theme is required']
    },
    // todoLists: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'TodoList',
    //   foreignField: 'project',
    //   localField: '_id'
    // }],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The workspace must belong to an User']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
WorkspaceSchema.virtual('todoLists', {
    ref: 'TodoList',
    foreignField: 'project',
    localField: '_id'
});
const Workspace = mongoose_1.model('Workspace', WorkspaceSchema);
exports.default = Workspace;
