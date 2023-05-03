import { IProperties } from "../app/interfaces/IProperties";
import * as fs from "fs";
import * as path from "path";
import { IResult } from "../app/interfaces";
import errors from "../errors";
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

  /**
   *
   * @param className
   * @returns
   */
  getCommandClassPath(className: string) {
    let path = `${this.properties.commandPath}/${className}`;
    if (!className.endsWith(".ts")) {
      path = `${this.properties.commandPath}/${className}.ts`;
    }
    return path;
  }

  /**
   *
   * @param targetPath
   */
  createFolderIfNotExist(targetPath: string) {
    if (!fs.existsSync(targetPath)) {
      const parentPath = path.dirname(targetPath);
      this.createFolderIfNotExist(parentPath);
      fs.mkdirSync(targetPath);
    }
  }

  /**
   *
   * @param signature
   * @returns
   */
  getSignatureClassInstance(signature: string): IResult {
    try {
      const files = fs.readdirSync(this.properties.commandPath);
      for (const file of files) {
        const filePath = path.join(this.properties.commandPath, file);
        if (filePath.endsWith(".ts")) {
          const commandClass = require(filePath).default;
          const commandClassInstance = new commandClass();
          if (commandClassInstance.signature === signature) {
            return {
              status: true,
              data: commandClassInstance,
            };
          } else {
            return {
              status: false,
              errors: [errors.SIGNATURE_NOT_FOUND],
            };
          }
        }
      }
    } catch (error: any) {
      return {
        status: false,
        errors: [{ code: error.code, detail: error.message }],
      };
    }
    return {
      status: false,
      errors: [errors.UNKNOWN],
    };
  }

  log(result: IResult, message?: string) {
    if (message) {
      console.log(message);
      return;
    }
    if (!result.status) {
      console.log(
        result.errors
          ?.map((result) => {
            return `code: ${result.code} message: ${result.detail}`;
          })
          .join("\n")
      );
    }
  }
}
