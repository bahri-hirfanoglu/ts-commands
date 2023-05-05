"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCache = void 0;
const fs_1 = __importDefault(require("fs"));
class FileCache {
    constructor(cacheDir) {
        this.cacheDir = cacheDir;
    }
    set(key, data, ttl = 60 * 60 * 1000) {
        const expiresAt = Date.now() + ttl;
        const cacheItem = { data, expiresAt };
        const filePath = `${this.cacheDir}/${key}.json`;
        const dataToWrite = JSON.stringify(cacheItem);
        fs_1.default.writeFileSync(filePath, dataToWrite);
    }
    get(key) {
        const filePath = `${this.cacheDir}/${key}.json`;
        try {
            const fileContent = fs_1.default.readFileSync(filePath, "utf-8");
            const cacheItem = JSON.parse(fileContent);
            if (!cacheItem || Date.now() > cacheItem.expiresAt) {
                this.delete(key);
                return undefined;
            }
            return cacheItem.data;
        }
        catch (err) {
            return undefined;
        }
    }
    delete(key) {
        const filePath = `${this.cacheDir}/${key}.json`;
        try {
            fs_1.default.unlinkSync(filePath);
        }
        catch (err) { }
    }
    clear() {
        try {
            const files = fs_1.default.readdirSync(this.cacheDir);
            for (const file of files) {
                fs_1.default.unlinkSync(`${this.cacheDir}/${file}`);
            }
        }
        catch (err) { }
    }
}
exports.FileCache = FileCache;
