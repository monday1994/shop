"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../providers/routes");
const exceptionsHandler_1 = require("./exceptions/exceptionsHandler");
let app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//all routes mount
app = routes_1.mountRoutes(app, '/api/v1');
app.init = () => {
    // connect to db and set up other things once server gets up
    console.log('Db is up and running on port: ...');
};
app.use(exceptionsHandler_1.genericExceptionHandler);
exports.default = app;
//# sourceMappingURL=app.js.map