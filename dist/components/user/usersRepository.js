"use strict";
// user database access layer
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
exports.findAllUsers = void 0;
//temporary variable
const users = [{ id: 6, name: 'John3' }, { id: 2, name: 'John2' }, { id: 4, name: 'John2' }];
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
});
exports.findAllUsers = findAllUsers;
//# sourceMappingURL=usersRepository.js.map