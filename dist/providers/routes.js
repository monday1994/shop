"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountRoutes = void 0;
const usersRouter_1 = __importDefault(require("../components/user/usersRouter"));
const healthCheckHandler = (req, res) => {
    res.json({ status: 200, message: 'Health check - status ok!' });
};
const mountRoutes = (app, prefix) => {
    //health check
    app.get(`${prefix}/`, healthCheckHandler);
    //other routes
    app.use(`${prefix}/users`, usersRouter_1.default);
    return app;
};
exports.mountRoutes = mountRoutes;
//# sourceMappingURL=routes.js.map