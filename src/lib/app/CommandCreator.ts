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

  create(command: TCommand): IResult {
    if (!this.helper.existsCommandPath()) {
      this.helper.createCommandPath();
    }
    let stup = this.helper.readStupFile();
    for (const [key, value] of Object.entries(command)) {
      stup = stup.replace("{{" + key + "}}", value);
    }
    const path = this.helper.getCommandClassPath(command.className);
    try {
      fs.writeFileSync(path, stup);
    } catch (error: any) {
      return {
        status: false,
        errors: [{ code: error.code, detail: error.message }],
      };
    }
    return {
      status: true,
    };
  }
}
