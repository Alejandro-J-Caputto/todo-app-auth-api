import { NextFunction, Request, Response } from "express";
import TodoList from "../models/todolist";
import Workspace from "../models/workspace";


export const getTodoList = async(req: Request, res:Response, next: NextFunction) => {

  const todoList = await TodoList.find().populate('project' , 'title _id').populate('user', 'name email id').populate('todos', 'todo done');

  res.status(200).json({
    status:'success',
    todoList
  })

}
export const getTodoListById = async (req: Request, res:Response, next: NextFunction) => {

 

  res.status(200).json({
    status:'success',
    message: 'TodoList created sucesfully',
    
  })

}
export const createTodoList = async (req: Request, res:Response, next: NextFunction) => {

  const {name, project, user } = req.body;

  const newTodoList = new TodoList({name, project, user});


  await newTodoList.save();
  res.status(200).json({
    status:'success',
    message: 'Hello from todolist',
    newTodoList
  })

}

export const getTodoListByBoard = async (req: Request, res:Response, next: NextFunction) => {

  const {board} = req.params
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

export const getTodoListByBoardAndTodoListId = async (req: Request, res:Response, next: NextFunction) => {
  const {board, todoListId} = req.params
  //check if workspace exists

  const workspace = await Workspace.findById(board);

  if(workspace){
    const todoLists = await TodoList.findById(todoListId)
    res.status(200).json({
      status: 'success',
      todoLists
    })
  }
}

export const patchTodoList = (req: Request, res:Response, next: NextFunction) => {

  res.status(200).json({
    status:'success',
    message: 'Hello from todolist'
  })

}
export const deleteTodoList = (req: Request, res:Response, next: NextFunction) => {

  res.status(200).json({
    status:'success',
    message: 'Hello from todolist'
  })

}