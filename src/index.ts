import { ClassMap } from "./lib/app/ClassMap";
import { CommandCreator } from "./lib/app/CommandCreator";
import { CommandRunner } from "./lib/app/CommandRunner";
import { IProperties } from "./lib/app/interfaces/IProperties";
import { TCommand } from "./lib/app/types/TCommand";
import * as path from "path";

export class TSCommand {
  private _commandRunner: CommandRunner;
  private _commandCreator: CommandCreator;
  private _classMap: ClassMap;

  private _properties: IProperties = {
    commandPath: `${__dirname}/commands`,
    stupPath: "../stups/command.stup",
  };

  constructor(properties?: IProperties) {
    if (properties) {
      this._properties = properties;
    }
    this.setBaseExtension();
    this._classMap = new ClassMap(this._properties);
    this._commandRunner = new CommandRunner(this._properties);
    this._commandCreator = new CommandCreator(this._properties);
  }

  setBaseExtension() {
    const script: string = path.basename(process.argv[1]);
    this._properties.extName = path.extname(script);
  }

  setProperties(properties: IProperties) {
    this._properties = properties;
  }

  createCommand(command: TCommand) {
    this._commandCreator.create(command);
  }

  runCommand(signature: string) {
    this._commandRunner.run(signature);
  }

  reloadClassMap() {}
}
