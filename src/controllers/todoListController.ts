import { NextFunction, Request, Response } from "express";
import Todo from "../models/todo";
import TodoList from "../models/todolist";
import Workspace from "../models/workspace";
import { catchAsync } from "../utils/catchAsync";


export const getTodoList = async(req: Request, res:Response, next: NextFunction) => {

  const todoList = await TodoList.find().populate('project' , 'title _id').populate('user', 'name email id').populate('todos', 'todo done');

  res.status(200).json({
    status:'success',
    todoList
  })

}
export const getTodoListById = async (req: Request, res:Response, next: NextFunction) => {

  const {id} = req.params;
  console.log(id)

  const todoList = await TodoList.find({project: id}).populate('project' , 'title _id').populate('user', 'name email id').populate('todos', 'todo done')

  

  res.status(200).json({
    status:'success',
    todoList,
    
  })

}
export const createTodoList = async (req: Request, res:Response, next: NextFunction) => {

  const {name, project, uid } = req.body;

  const newTodoList = new TodoList({name, project, user:uid});


  await newTodoList.save();
  res.status(200).json({
    status:'success',
    message: 'Hello from todolist',
    newTodoList
  })

}

export const getTodoListByBoard = async (req: Request, res:Response, next: NextFunction) => {
  console.log('patata')
  const {board} = req.params
  console.log(board)
  //check if workspace exists

  const workspace = await Workspace.findById(board);

  if(workspace){
    const todoLists = await TodoList.find({project: board})
    res.status(200).json({
      status: 'success',
      todoLists
    })
  }

  //if exits find the todolists



}

export const getTodoListByBoardAndTodoListId = catchAsync(async (req: Request, res:Response, next: NextFunction) => {
  const {board, todoListId} = req.params
  //check if workspace exists

  console.log('aaaaaaaa')
  const workspace = await Workspace.findById(board);

  if(workspace){
    const todoLists = await TodoList.findById(todoListId)
    res.status(200).json({
      status: 'success',
      todoLists
    })
  }
})

export const patchTodoList = async (req: Request, res:Response, next: NextFunction) => {
  const {id} = req.params;
  const {name} = req.body;
  console.log('this id', id)
  console.log(name)
  const updatedName = await TodoList.findByIdAndUpdate(id, {name:name}, {new: true, runValidators: true})
  res.status(200).json({
    status:'success',
    updatedName
  })

}
export const deleteTodoList = async (req: Request, res:Response, next: NextFunction) => {
  const {id} = req.params;
  console.log(id)
  const deletedTodoList = await TodoList.findByIdAndDelete(id);
  console.log(deletedTodoList)
  res.status(200).json({
    status:'success',
    message: 'todolist sucesfully deleted',
    deletedTodoList
  })

}