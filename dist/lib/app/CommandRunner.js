"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRunner = void 0;
const CommandHelper_1 = require("../helpers/CommandHelper");
class CommandRunner {
    constructor(properties) {
        this._properties = properties;
        this.helper = new CommandHelper_1.CommandHelper();
        this.helper.setProperties(this._properties);
    }
    setProperties(properties) {
        this._properties = properties;
    }
    run(signature) {
        const result = this.helper.getSignatureClassInstance(signature);
        if (result.status) {
            const commandInstance = result.data;
            const commandResult = commandInstance.process();
            this.helper.log(result, `[${signature}] command run success!\nResult: ${commandResult}`);
        }
        this.helper.log(result);
    }
}
exports.CommandRunner = CommandRunner;
