"use strict";
//validator middleware
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetUserRequest = void 0;
const validateGetUserRequest = (req, res, next) => {
    //validate request body / query / params
    const isValid = false;
    try {
        throw new Error({ message: 'access denied' });
    }
    catch (err) {
        console.log('err in catch = ', err.message);
        next({ message: 'access denied' });
    }
    if (isValid) {
        next();
    }
    else {
        next({ message: 'access denied' });
    }
};
exports.validateGetUserRequest = validateGetUserRequest;
//# sourceMappingURL=usersValidator.js.map