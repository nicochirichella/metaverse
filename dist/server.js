"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const express_1 = __importDefault(require("express"));
const components_1 = require("./components");
const Runner_1 = require("./migrations/Runner");
const routes_1 = require("./routes");
async function main() {
    var _a;
    const expressApp = express_1.default();
    expressApp.use(express_1.default.json());
    const components = await components_1.initComponents();
    await Runner_1.MigrationsRunner.run();
    await routes_1.configureRoutes(expressApp, components);
    const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8081", 10);
    return new Promise((resolve, reject) => {
        const server = expressApp
            .listen(port, () => {
            components.logger.info(`Application listening in port ${port}`);
            resolve(server);
        })
            .on("error", (e) => {
            reject(e);
        });
    });
}
exports.main = main;
//# sourceMappingURL=server.js.map