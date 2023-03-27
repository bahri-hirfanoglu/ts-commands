import { ClassMap } from "./ClassMap";
import { IProperties } from "./interfaces/IProperties";
export class CommandRunner {
  private _classMap: ClassMap;
  private _properties: IProperties;

  constructor(properties: IProperties, classMap: ClassMap) {
    this._properties = properties;
    this._classMap = classMap;
  }

  setProperties(properties: IProperties) {
    this._properties = properties;
  }
}
