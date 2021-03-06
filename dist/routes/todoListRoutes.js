"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoListController_1 = require("../controllers/todoListController");
const validatorsControllers_1 = require("../middlewares/validatorsControllers");
const router = express_1.Router({ mergeParams: true });
router.get('/', todoListController_1.getTodoList);
router.get('/:id', todoListController_1.getTodoListById);
router.post('/', validatorsControllers_1.validateJWT, todoListController_1.createTodoList);
router.patch('/:id', validatorsControllers_1.validateJWT, todoListController_1.patchTodoList);
router.delete('/:id', todoListController_1.deleteTodoList);
// router.get('/:board/todoList', getTodoListByBoard);
// router.get('/:board/todoList/:todoListId', getTodoListByBoardAndTodoListId);
exports.default = router;
