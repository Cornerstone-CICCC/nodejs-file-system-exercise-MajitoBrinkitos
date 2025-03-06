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
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const promises_1 = require("fs/promises");
//server
const server = http_1.default.createServer((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { method } = request;
    const parsedUrl = url_1.default.parse(request.url || '', true);
    const { pathname, query } = parsedUrl;
    const fileName = query.filename;
    // Allow CORS policy headers
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // CORS Pre-flight check
    if (method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
    }
    // Home route
    if (pathname === "/" && method === "GET") {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Home page</h1>");
        return;
    }
    // View image route
    if (pathname === "/view-image" && fileName && method === "GET") {
        try {
            const data = yield (0, promises_1.readFile)(`./dist/images/veryhappydog.jpg`);
            response.writeHead(200, { "Content-Type": "image/jpeg" });
            response.end(data);
        }
        catch (err) {
            console.error(err);
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end("Image cannot be displayed");
        }
        return;
    }
    // 404 Fallback
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not Found!");
}));
//for view the image
//http://localhost:3700/view-image?filename=veryhappydog.jpg
const PORT = process.env.PORT || 3700;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
