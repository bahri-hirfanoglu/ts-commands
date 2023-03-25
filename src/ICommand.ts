export interface ICommand {
  name: string; //name of the command
  description: string; //description of the command
  process(): void;
}