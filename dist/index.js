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
exports.TSCommand = void 0;
const ClassMap_1 = require("./lib/app/ClassMap");
const CommandCreator_1 = require("./lib/app/CommandCreator");
const CommandRunner_1 = require("./lib/app/CommandRunner");
const path = __importStar(require("path"));
class TSCommand {
    constructor(properties) {
        this._properties = {
            commandPath: `${__dirname}/commands`,
            stupPath: "../stups/command.stup",
        };
        if (properties) {
            this._properties = properties;
        }
        this.setBaseExtension();
        this._classMap = new ClassMap_1.ClassMap(this._properties);
        this._commandRunner = new CommandRunner_1.CommandRunner(this._properties);
        this._commandCreator = new CommandCreator_1.CommandCreator(this._properties);
    }
    setBaseExtension() {
        const script = path.basename(process.argv[1]);
        this._properties.extName = path.extname(script);
    }
    setProperties(properties) {
        this._properties = properties;
    }
    createCommand(command) {
        this._commandCreator.create(command);
    }
    runCommand(signature) {
        this._commandRunner.run(signature);
    }
    reloadClassMap() { }
}
exports.TSCommand = TSCommand;
