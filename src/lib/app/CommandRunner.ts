import { ClassMap } from "./ClassMap";
import { IProperties } from "./interfaces/IProperties";
export class CommandRunner {
  private _properties: IProperties;

  constructor(properties: IProperties) {
    this._properties = properties;
  }

  setProperties(properties: IProperties) {
    this._properties = properties;
  }
}
