import { FileCache } from './options/FileCache';
import { CacheItem } from './interfaces/CacheItem';
import { CacheOptions } from './interfaces/CacheOptions';

export class Cache {
    private memoryCache: Map<string, CacheItem<any>>;
    private fileCache: FileCache | null;
    private useMemoryCache: boolean;
    private useFileCache: boolean;
  
    constructor(options?: CacheOptions) {
      this.memoryCache = new Map<string, CacheItem<any>>();
      this.fileCache = null;
  
      if (options?.useFileCache) {
        this.fileCache = new FileCache(options.fileCacheDir || './cache');
      }
  
      this.useMemoryCache = options?.useMemoryCache ?? true;
      this.useFileCache = options?.useFileCache ?? false;
    }
  
    public set<T>(key: string, data: T, ttl: number = 60 * 60 * 1000): void {
      const expiresAt = Date.now() + ttl;
      const cacheItem: CacheItem<T> = { data, expiresAt };
  
      if (this.useMemoryCache) {
        this.memoryCache.set(key, cacheItem);
      }
  
      if (this.useFileCache && this.fileCache) {
        this.fileCache.set(key, cacheItem, ttl);
      }
    }
  
    public get<T>(key: string): T | undefined {
      let cacheItem: CacheItem<T> | undefined;
  
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
  
    public delete(key: string): void {
      if (this.useMemoryCache) {
        this.memoryCache.delete(key);
      }
  
      if (this.useFileCache && this.fileCache) {
        this.fileCache.delete(key);
      }
    }
  
    public clear(): void {
      if (this.useMemoryCache) {
        this.memoryCache.clear();
      }
  
      if (this.useFileCache && this.fileCache) {
        this.fileCache.clear();
      }
    }
  }