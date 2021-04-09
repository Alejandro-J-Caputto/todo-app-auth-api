"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadsController_1 = require("../controllers/uploadsController");
const validatorsControllers_1 = require("../middlewares/validatorsControllers");
const router = express_1.Router();
// router.put('/:colection/:id', validateJWT, uploadImageCloudinary);
router.post('/:colection', validatorsControllers_1.validateJWT, uploadsController_1.uploadImageCloudinary);
exports.default = router;
