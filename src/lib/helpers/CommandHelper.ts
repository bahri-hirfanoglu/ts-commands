import { IProperties } from "../app/interfaces/IProperties";
import * as fs from "fs";
import * as path from "path";
import { IResult } from "../app/interfaces";
import errors from "../errors";
import { TCommand } from "../app/types/TCommand";
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

  getBaseExtension(): string {
    return this.properties.extName ?? ".ts";
  }

  readStupFile(): string {
    if (this.properties.stupPath) {
      const stupPath = path.join(
        path.resolve(),
        "src",
        "lib",
        "app",
        "stups",
        `command${this.getBaseExtension()}.stup`
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
    const extName: string = this.getBaseExtension();
    if (!className.endsWith(extName)) {
      path = `${this.properties.commandPath}/${className}${extName}`;
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
        if (filePath.endsWith(this.getBaseExtension())) {
          const commandClass = require(filePath.replace('.js', '')).default;
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

  getStupFileData(command: TCommand): string {
    let stup = this.readStupFile();
    for (const [key, value] of Object.entries(command)) {
      stup = stup.replaceAll("{{" + key + "}}", value);
    }
    return stup;
  }

  /**
   *
   * @param result
   * @param message
   * @returns
   */
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

  /**
   *
   * @param str
   * @returns
   */
  toCamelCase(str: string): string {
    return str.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  }

  /**
   *
   * @param str
   * @returns
   */
  toKebabCase(str: string): string {
    return str
      .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
      .replace(/^-/, "");
  }
}
