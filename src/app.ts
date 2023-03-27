import { TSCommand } from "./index";
import * as path from "path";

const commands = new TSCommand();
commands.setProperties({
  commandPath: path.join(path.resolve(), "src", "commands"),
});

commands.createCommand({
  className: "Bahri",
  name: "test",
  description: "test",
});
