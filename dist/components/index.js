"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter_1 = __importDefault(require("./user/userRouter"));
const eventsController_1 = __importDefault(require("./event/eventsController"));
const healthCheckHandler = (req, res) => {
    res.json({ status: 200, message: 'Health check - status ok!' });
};
const mountRoutes = (app) => {
    //health check
    app.get('/', healthCheckHandler);
    //other routes
    app.use('/users', userRouter_1.default);
    app.use('/events', eventsController_1.default);
    return app;
};
exports.default = mountRoutes;
//# sourceMappingURL=index.js.map