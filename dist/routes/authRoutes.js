"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const validatorsControllers_1 = require("../middlewares/validatorsControllers");
const router = express_1.Router();
router.post('/login', 
// check('email', 'the email is required').isEmail(),
// check('password', 'the password is required').not().isEmpty(),
// validateFields,
authController_1.login);
router.post('/register', express_validator_1.check('name', 'The name is required').not().isEmpty(), express_validator_1.check('email', 'the email is required').isEmail(), express_validator_1.check('password', 'the password is required').not().isEmpty(), express_validator_1.check('passwordConfirm', 'the passwordConfirm is required').not().isEmpty(), validatorsControllers_1.checkPasswordConfirmation, validatorsControllers_1.checkEmailExists, validatorsControllers_1.validateFields, authController_1.singIn);
router.get('/checkToken', validatorsControllers_1.validateJWT, authController_1.renewToken);
router.get('/logout', authController_1.logOut);
exports.default = router;
