import { IResult } from "./interfaces";
import { TCommand } from "./types/TCommand";
import { IProperties } from "./interfaces/IProperties";
import { CommandHelper } from "../helpers/CommandHelper";
import fs from "fs";
export class CommandCreator {
  private _properties: IProperties;
  private helper: CommandHelper;
  constructor(properties: IProperties) {
    this._properties = properties;
    this.helper = new CommandHelper();
    this.helper.setProperties(this._properties);
  }

  commandFormat(command: TCommand) {
    command.className = this.helper.toCamelCase(command.className);
    command.signature = this.helper.toKebabCase(
      command.signature ?? command.className
    );
  }

  create(command: TCommand): IResult {
    try {
      if (!this.helper.existsCommandPath()) {
        this.helper.createCommandPath();
      }
      this.commandFormat(command);
      const path = this.helper.getCommandClassPath(command.className);
      const stup = this.helper.getStupFileData(command);
      fs.writeFileSync(path, stup);
      const result: IResult = {
        status: true,
        data: command,
      };
      this.helper.log(
        result,
        `[${result.data.className}] command created success!\nCommand Signature: ${result.data.signature}`
      );
      return result;
    } catch (error: any) {
      return {
        status: false,
        errors: [{ code: error.code, detail: error.message }],
      };
    }
  }
}
