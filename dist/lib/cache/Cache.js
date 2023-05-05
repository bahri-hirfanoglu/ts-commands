"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const FileCache_1 = require("./options/FileCache");
class Cache {
    constructor(options) {
        this.memoryCache = new Map();
        this.fileCache = null;
        if (options?.useFileCache) {
            this.fileCache = new FileCache_1.FileCache(options.fileCacheDir || './cache');
        }
        this.useMemoryCache = options?.useMemoryCache ?? true;
        this.useFileCache = options?.useFileCache ?? false;
    }
    set(key, data, ttl = 60 * 60 * 1000) {
        const expiresAt = Date.now() + ttl;
        const cacheItem = { data, expiresAt };
        if (this.useMemoryCache) {
            this.memoryCache.set(key, cacheItem);
        }
        if (this.useFileCache && this.fileCache) {
            this.fileCache.set(key, cacheItem, ttl);
        }
    }
    get(key) {
        let cacheItem;
        if (this.useMemoryCache) {
            cacheItem = this.memoryCache.get(key);
        }
        if (this.useFileCache && !cacheItem && this.fileCache) {
            cacheItem = this.fileCache.get(key);
            if (cacheItem) {
                this.memoryCache.set(key, cacheItem);
            }
        }
        if (!cacheItem || Date.now() > cacheItem.expiresAt) {
            this.delete(key);
            return undefined;
        }
        return cacheItem.data;
    }
    delete(key) {
        if (this.useMemoryCache) {
            this.memoryCache.delete(key);
        }
        if (this.useFileCache && this.fileCache) {
            this.fileCache.delete(key);
        }
    }
    clear() {
        if (this.useMemoryCache) {
            this.memoryCache.clear();
        }
        if (this.useFileCache && this.fileCache) {
            this.fileCache.clear();
        }
    }
}
exports.Cache = Cache;
