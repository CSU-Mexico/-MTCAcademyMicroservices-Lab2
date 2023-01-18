"use strict";
//import http = require('http');
//const port = process.env.port || 1337
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);
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
const dapr_1 = require("@dapr/dapr");
const bodyParser = require('body-parser');
const expenseNotificationController_1 = __importDefault(require("./controllers/expenseNotificationController"));
const DAPR_HOST = process.env.DAPR_HOST || "http://localhost";
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || "3501";
const SERVER_HOST = process.env.SERVER_HOST || "127.0.0.1";
const SERVER_PORT = process.env.APP_PORT || '5002';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new dapr_1.DaprServer(SERVER_HOST, SERVER_PORT, DAPR_HOST, DAPR_HTTP_PORT);
        // Dapr subscription routes orders topic to this route
        server.pubsub.subscribe("servicebus-pubsub", "expensetopic", (data) => __awaiter(this, void 0, void 0, function* () {
            console.log("Subscriber received: " + JSON.stringify(data));
            expenseNotificationController_1.default.sendExpenseNotification(JSON.stringify(data));
        }));
        yield server.start();
    });
}
main().catch(e => console.error(e));
//# sourceMappingURL=server.js.map