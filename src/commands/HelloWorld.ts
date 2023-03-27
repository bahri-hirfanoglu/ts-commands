import { ICommand } from "../lib/command/interfaces/ICommand";
import { ConsoleLog } from "../lib/logger/ConsoleLog";
export default class HelloWorld implements ICommand {
  name: string = "hello-world";

  description: string = "Hello World Process";

  log: ConsoleLog;

  constructor() {
    this.log = new ConsoleLog();
  }

  process(): void {
    this.log.debug("test");
  }
}
