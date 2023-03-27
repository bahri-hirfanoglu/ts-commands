import { IResult } from "./interfaces";
import { TCommand } from "./types/TCommand";
import { IProperties } from "./interfaces/IProperties";
import { CommandHelper } from "../helpers/CommandHelper";

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
      stup = stup.replace('{{' + key + '}}', value);
    }
    this.helper.checkCommandClass(command.className, stup);

    //fs.writeFileSync(`${this._properties.commandPath}/${command.className}`, '');

    return {
      status: true,
      data: {},
    };
  }
}
