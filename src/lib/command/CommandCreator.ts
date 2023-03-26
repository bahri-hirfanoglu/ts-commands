import {
  generateCommandName,
  generateCommandDescription,
} from "../helpers/creatorHelper";

import { Result } from "./interfaces";

export class CommandCreator {
  name: string;
  className: string;
  description: string;

  constructor(className: string, description?: string, name?: string) {
    this.className = className;
    this.name = name ?? generateCommandName(className);
    this.description = description ?? generateCommandDescription(className);
  }

  create(): Result {
    return {
      status: true,
      data: {},
    };
  }
}
