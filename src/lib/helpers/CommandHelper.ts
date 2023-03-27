import { IProperties } from "../app/interfaces/IProperties";
import * as fs from "fs";
import * as path from "path";

export class CommandHelper {
  declare private properties: IProperties;

  setProperties(properties: IProperties) {
    this.properties = properties
  }
  
  existsCommandPath(): boolean {
    return fs.existsSync(this.properties.commandPath);
  }

  createCommandPath() {
    this.createFolderIfNotExist(this.properties.commandPath);
  }

  checkCommandClassExists() {

  }

  createFolderIfNotExist(targetPath: string) {
    if (!fs.existsSync(targetPath)) {
      const parentPath = path.dirname(targetPath);
      this.createFolderIfNotExist(parentPath);
      fs.mkdirSync(targetPath);
    }
  }
}
