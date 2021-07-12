"use strict";
//business logic layer
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const usersRepository_1 = require("./usersRepository");
const getAll = () => {
    return usersRepository_1.findAllUsers();
};
exports.getAll = getAll;
//# sourceMappingURL=usersService.js.map