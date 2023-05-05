import { ClassMap } from "./ClassMap";
import { IProperties } from "./interfaces/IProperties";
import { CommandHelper } from "../helpers/CommandHelper";
import { IResult } from "./interfaces";

export class CommandRunner {
  private _properties: IProperties;
  private helper: CommandHelper;

  constructor(properties: IProperties) {
    this._properties = properties;
    this.helper = new CommandHelper();
    this.helper.setProperties(this._properties);
  }

  setProperties(properties: IProperties) {
    this._properties = properties;
  }

  run(signature: string) {
    const result : IResult = this.helper.getSignatureClassInstance(signature);
    if(result.status) {
      const commandInstance = result.data;
      const commandResult = commandInstance.process();
      this.helper.log(result, `[${signature}] command run success!\nResult: ${commandResult}`)
    }
    this.helper.log(result);
  }
}
