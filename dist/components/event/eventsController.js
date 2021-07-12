"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    getEventById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.eventsService.getEventById('dupa');
            res.json({
                status: 200,
                message: 'its ok to be white'
            });
        });
    }
}
const eventsService_1 = __importDefault(require("./eventsService"));
const eventsRepository_1 = __importDefault(require("./eventsRepository"));
const eventsRepository = new eventsRepository_1.default({ name: 'db' });
const eventsService = new eventsService_1.default(eventsRepository);
exports.default = new EventsController(eventsService);
exports.default = EventsController;
//# sourceMappingURL=eventsController.js.map