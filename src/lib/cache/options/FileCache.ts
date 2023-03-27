import fs from "fs";
import { CacheItem } from "../interfaces/CacheItem";

export class FileCache {
  private cacheDir: string;

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir;
  }

  public set<T>(key: string, data: T, ttl: number = 60 * 60 * 1000): void {
    const expiresAt = Date.now() + ttl;
    const cacheItem: CacheItem<T> = { data, expiresAt };
    const filePath = `${this.cacheDir}/${key}.json`;
    const dataToWrite = JSON.stringify(cacheItem);
    fs.writeFileSync(filePath, dataToWrite);
  }

  public get<T>(key: string): T | undefined {
    const filePath = `${this.cacheDir}/${key}.json`;

    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const cacheItem = JSON.parse(fileContent) as CacheItem<T>;

      if (!cacheItem || Date.now() > cacheItem.expiresAt) {
        this.delete(key);
        return undefined;
      }

      return cacheItem.data;
    } catch (err) {
      return undefined;
    }
  }

  public delete(key: string): void {
    const filePath = `${this.cacheDir}/${key}.json`;

    try {
      fs.unlinkSync(filePath);
    } catch (err) {}
  }

  public clear(): void {
    try {
      const files = fs.readdirSync(this.cacheDir);
      for (const file of files) {
        fs.unlinkSync(`${this.cacheDir}/${file}`);
      }
    } catch (err) {}
  }
}
