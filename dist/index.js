"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const default_1 = __importDefault(require("./config/default"));
const app_1 = __importDefault(require("./app/app"));
// Get port from environment and store in Express.
const port = process.env.PORT || default_1.default.port;
// Create HTTP server.
http_1.default.createServer(app_1.default).listen(port, () => {
    console.log(`Running on port ${port}`);
    app_1.default.init();
});
//# sourceMappingURL=index.js.map