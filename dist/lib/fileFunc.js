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
exports.deleteAFile = exports.createFile = exports.readAFile = exports.listFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const directory = "docs";
const docsDirectory = path_1.default.join(__dirname, "../../", directory);
const listFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield fs_1.default.promises.readdir(docsDirectory);
        return files;
    }
    catch (err) {
        throw new Error("Unable to read directory...");
    }
});
exports.listFiles = listFiles;
const readAFile = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.join(docsDirectory, filename);
        const data = yield fs_1.default.promises.readFile(filePath);
        return data;
    }
    catch (err) {
        throw new Error("Something went wrong...");
    }
});
exports.readAFile = readAFile;
const createFile = (filename, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.join(docsDirectory, filename);
        yield fs_1.default.promises.writeFile(filePath, content);
        return true;
    }
    catch (err) {
        throw new Error("Something went wrong...");
    }
});
exports.createFile = createFile;
const deleteAFile = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.join(docsDirectory, filename);
        yield fs_1.default.promises.unlink(filePath);
        return true;
    }
    catch (err) {
        throw new Error(`Unable to delete file: ${filename}`);
    }
});
exports.deleteAFile = deleteAFile;
