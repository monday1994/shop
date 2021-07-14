"use strict";
// component controller layer
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../entities/User");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const allUsers = await getAll();
        const usersRepository = typeorm_1.getRepository(User_1.User);
        let newUser = new User_1.User();
        newUser = Object.assign(Object.assign({}, newUser), { firstName: 'Francis', lastName: 'Monday', email: 'francis.monday@gmail.com', password: 'somepass' });
        yield usersRepository.save(newUser);
        res.status(200);
        res.json({
            results: newUser
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=userController.js.map