"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchController_1 = require("../controllers/searchController");
const router = express_1.Router();
router.get('/:colection/:terminus', searchController_1.searchDoc);
exports.default = router;
