import { ConsoleLog } from "./lib/logger/ConsoleLog";
export interface ICommand {
  name: string; //name of the command
  description: string; //description of the command
  log: ConsoleLog;
  process(): void;
}