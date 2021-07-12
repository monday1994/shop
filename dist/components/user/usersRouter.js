"use strict";
// component routing layer
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./userController");
const router = express_1.Router();
router.get('', userController_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=usersRouter.js.map