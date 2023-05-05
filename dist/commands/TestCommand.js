"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestCommand {
    constructor() {
        /**
         * signature of the command
         * @param {string}
         */
        this.signature = "test-command";
        /**
         * description of the task of the command
         * @param {string}
         */
        this.description = "TestCommand description";
    }
    /**
     * @return {Number}
     */
    process() {
        return 0;
    }
}
exports.default = TestCommand;
