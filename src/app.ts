#!/usr/bin/env node

import { TSCommand } from "./index";
import * as path from "path";
import { Command } from "commander";

const program = new Command();
program.version("0.1.0");

const commands = new TSCommand();
commands.setProperties({
  commandPath: path.join(path.resolve(), "src", "commands"),
});

program
  .command("make-command")
  .option("-n, --name <name>", "Enter class name")
  .option("-s, --signature <signature>", "Enter command signature")
  .option("-d, --description <description>", "Enter command description")
  .description("creates a script execution file")
  .action((options: any) => {
    const name = options.name || null;
    const signature = options.signature || "";
    const description = options.description || `${name} description`;
    commands.createCommand({
      className: name,
      name: signature,
      description: description,
    });
  });

program.parse(process.argv);
