"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./userController");
const usersValidator_1 = require("./usersValidator");
const router = express_1.Router();
router.get('', usersValidator_1.validateGetUserRequest, userController_1.getUser);
exports.default = router;
//# sourceMappingURL=userRouter.js.map