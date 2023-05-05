#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const path = __importStar(require("path"));
const commander_1 = require("commander");
const program = new commander_1.Command();
program.version("0.1.0");
/* TS Command Instance */
const commands = new index_1.TSCommand();
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
    .description("runs the specified script [options]: --name")
    .action((options) => {
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
    .action((options) => {
    const signature = options.signature ?? null;
    commands.runCommand(signature);
});
program.parse(process.argv);
