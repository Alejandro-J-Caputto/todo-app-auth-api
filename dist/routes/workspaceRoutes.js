"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workspaceController_1 = require("../controllers/workspaceController");
const todoListController_1 = require("../controllers/todoListController");
const validatorsControllers_1 = require("../middlewares/validatorsControllers");
const router = express_1.Router();
//ENDPOINT FOR DEVELOPMENT
router.get('/', validatorsControllers_1.validateJWT, workspaceController_1.getWorkspace);
router.get('/:id', workspaceController_1.getWorkspaceById);
router.post('/', validatorsControllers_1.validateJWT, workspaceController_1.createWorkspace);
router.patch('/', workspaceController_1.patchWorkspace);
router.patch('/', workspaceController_1.deleteWorkspace);
//ENDPOINTS FOR PRODUCTION
// router.get('/:workspaceId/todoLists',  todoListRoutes);
router.use(validatorsControllers_1.validateJWT);
router.get('/:board/todoList', todoListController_1.getTodoListByBoard);
router.get('/:board/todoList/:todoListId', todoListController_1.getTodoListByBoardAndTodoListId);
exports.default = router;
