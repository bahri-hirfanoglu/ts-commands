import { IProperties } from "../app/interfaces/IProperties";
import * as fs from "fs";
import * as path from "path";
export class CommandHelper {
  private declare properties: IProperties;

  setProperties(properties: IProperties) {
    this.properties = properties;
  }

  existsCommandPath(): boolean {
    return fs.existsSync(this.properties.commandPath);
  }

  createCommandPath() {
    this.createFolderIfNotExist(this.properties.commandPath);
  }

  readStupFile(): string {
    if (this.properties.stupPath) {
      const stupPath = path.join(
        path.resolve(),
        "src",
        "lib",
        "app",
        "stups",
        "command.stup"
      );
      if (fs.existsSync(stupPath)) {
        return fs.readFileSync(stupPath, "utf-8") as string;
      }
      throw new Error(`stupPath: ${stupPath} not found`);
    }
    throw new Error("properties in stupPath undefined");
  }

  checkCommandClass(className: string, stupData: string) {
    let path = `${this.properties.commandPath}/${className}`
    if(!className.endsWith('.ts')) {
      path = `${this.properties.commandPath}/${className}.ts`
    }
    console.log(fs.writeFileSync(path, stupData))
  }

  createCommandInterface() {
    
  }

  createFolderIfNotExist(targetPath: string) {
    if (!fs.existsSync(targetPath)) {
      const parentPath = path.dirname(targetPath);
      this.createFolderIfNotExist(parentPath);
      fs.mkdirSync(targetPath);
    }
  }
}
