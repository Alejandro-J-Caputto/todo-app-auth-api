"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validatorsControllers_1 = require("../middlewares/validatorsControllers");
const router = express_1.Router();
router.get('/', [], userController_1.getUsers);
router.post('/', [], userController_1.postUser);
router.get('/:id', [], userController_1.getUserById);
router.put('/:id', [], userController_1.putUser);
router.delete('/:id', [validatorsControllers_1.validateJWT], userController_1.deleteUser);
exports.default = router;
