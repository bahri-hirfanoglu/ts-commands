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

  getCommandClassPath(className: string) {
    let path = `${this.properties.commandPath}/${className}`;
    if (!className.endsWith(".ts")) {
      path = `${this.properties.commandPath}/${className}.ts`;
    }
    return path;
  }

  createFolderIfNotExist(targetPath: string) {
    if (!fs.existsSync(targetPath)) {
      const parentPath = path.dirname(targetPath);
      this.createFolderIfNotExist(parentPath);
      fs.mkdirSync(targetPath);
    }
  }

  getSignatureClassInstance(signature: string) {
    const files = fs.readdirSync(this.properties.commandPath);
    for (const file of files) {
      const filePath = path.join(this.properties.commandPath, file);

      if (filePath.endsWith(".ts")) {
        console.log(filePath)
        const commandClass = require(filePath).default;
        const commandClassInstance = new commandClass();
        console.log(commandClassInstance)
        if (commandClassInstance.signature === signature) {
          return commandClassInstance;
        }
      }
    }
    return null;
  }
}
