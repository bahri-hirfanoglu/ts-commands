#!/usr/bin/env node

import { TSCommand } from "./index";
import * as path from "path";
import { Command } from "commander";

const program = new Command();
program.version("0.1.0");

/* TS Command Instance */
const commands = new TSCommand();
commands.setProperties({
  commandPath: path.join(path.resolve(), "src", "commands"),
});

/**
 * * Make Commad (make-command)
 * --name | -s
 * --signature | -s
 * --description | -d
 */
program
  .command("make-command")
  .option("-n, --name <name>", "Enter command class name")
  .description(
    "runs the specified script [options]: --name"
  )
  .action((options: any) => {
    const name = options.name || null;
    const description = options.description || `${name} description`;
    commands.createCommand({
      className: name,
      description: description,
    });
  });

/**
 * * Run Command (run-command)
 * --name | -n
 * --signature | -s
 */
program
  .command("run-command")
  .option("-s, --signature <signature>", "Enter command signature")
  .description("creates a script execution file [options: --signature")
  .action((options: any) => {
    const signature = options.signature ?? null;
    commands.runCommand(signature);
  });

program.parse(process.argv);
