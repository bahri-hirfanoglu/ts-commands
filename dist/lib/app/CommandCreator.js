"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandCreator = void 0;
const CommandHelper_1 = require("../helpers/CommandHelper");
const fs_1 = __importDefault(require("fs"));
class CommandCreator {
    constructor(properties) {
        this._properties = properties;
        this.helper = new CommandHelper_1.CommandHelper();
        this.helper.setProperties(this._properties);
    }
    commandFormat(command) {
        command.className = this.helper.toCamelCase(command.className);
        command.signature = this.helper.toKebabCase(command.signature ?? command.className);
    }
    create(command) {
        try {
            if (!this.helper.existsCommandPath()) {
                this.helper.createCommandPath();
            }
            this.commandFormat(command);
            const path = this.helper.getCommandClassPath(command.className);
            const stup = this.helper.getStupFileData(command);
            fs_1.default.writeFileSync(path, stup);
            const result = {
                status: true,
                data: command,
            };
            this.helper.log(result, `[${result.data.className}] command created success!\nCommand Signature: ${result.data.signature}`);
            return result;
        }
        catch (error) {
            return {
                status: false,
                errors: [{ code: error.code, detail: error.message }],
            };
        }
    }
}
exports.CommandCreator = CommandCreator;
