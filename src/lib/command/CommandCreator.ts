import {
  generateCommandName,
  generateCommandDescription,
} from "../helpers/creatorHelper";

import { IResult } from "./interfaces";

export class CommandCreator {
  name: string;
  className: string;
  description: string;

  constructor(className: string, description?: string, name?: string) {
    this.className = className;
    this.name = name ?? generateCommandName(className);
    this.description = description ?? generateCommandDescription(className);
  }

  create(): IResult {
    return {
      status: true,
      data: {},
    };
  }
}
