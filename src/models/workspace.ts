import {WorkspaceInterface} from '../interfaces/interfaces';

import {Schema, model, mongo} from 'mongoose';

const WorkspaceSchema = new Schema({
  id: {
    type: mongo.ObjectID,
  },
  title: {
    type: String,
    required: [true, 'A title is required']
  },
  date: {
    type: Date,
    default: new Date().getDate()
  },
  // todoLists: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'TodoList',
  //   foreignField: 'project',
  //   localField: '_id'
  // }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The workspace must belong to an User']
  }

},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
WorkspaceSchema.virtual('todoLists', {
  ref: 'TodoList', 
  foreignField: 'project',
  localField: '_id'
});


const Workspace = model<WorkspaceInterface>('Workspace', WorkspaceSchema );

export default  Workspace;