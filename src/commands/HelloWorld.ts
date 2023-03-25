import { ICommand } from "../ICommand";

export default class HelloWorld implements ICommand {
  
  name: string = "hello-world";
  
  description: string = "Hello World Process";

  process(): void {
    console.log("Hello World");
  }
}
