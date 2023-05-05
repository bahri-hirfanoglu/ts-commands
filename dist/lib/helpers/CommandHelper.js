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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHelper = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const errors_1 = __importDefault(require("../errors"));
class CommandHelper {
    setProperties(properties) {
        this.properties = properties;
    }
    existsCommandPath() {
        return fs.existsSync(this.properties.commandPath);
    }
    createCommandPath() {
        this.createFolderIfNotExist(this.properties.commandPath);
    }
    getBaseExtension() {
        return this.properties.extName ?? ".ts";
    }
    readStupFile() {
        if (this.properties.stupPath) {
            const stupPath = path.join(path.resolve(), "src", "lib", "app", "stups", `command${this.getBaseExtension()}.stup`);
            if (fs.existsSync(stupPath)) {
                return fs.readFileSync(stupPath, "utf-8");
            }
            throw new Error(`stupPath: ${stupPath} not found`);
        }
        throw new Error("properties in stupPath undefined");
    }
    /**
     *
     * @param className
     * @returns
     */
    getCommandClassPath(className) {
        let path = `${this.properties.commandPath}/${className}`;
        const extName = this.getBaseExtension();
        if (!className.endsWith(extName)) {
            path = `${this.properties.commandPath}/${className}${extName}`;
        }
        return path;
    }
    /**
     *
     * @param targetPath
     */
    createFolderIfNotExist(targetPath) {
        if (!fs.existsSync(targetPath)) {
            const parentPath = path.dirname(targetPath);
            this.createFolderIfNotExist(parentPath);
            fs.mkdirSync(targetPath);
        }
    }
    /**
     *
     * @param signature
     * @returns
     */
    getSignatureClassInstance(signature) {
        try {
            const files = fs.readdirSync(this.properties.commandPath);
            for (const file of files) {
                const filePath = path.join(this.properties.commandPath, file);
                if (filePath.endsWith(this.getBaseExtension())) {
                    const commandClass = require(filePath.replace('.js', '')).default;
                    const commandClassInstance = new commandClass();
                    if (commandClassInstance.signature === signature) {
                        return {
                            status: true,
                            data: commandClassInstance,
                        };
                    }
                    else {
                        return {
                            status: false,
                            errors: [errors_1.default.SIGNATURE_NOT_FOUND],
                        };
                    }
                }
            }
        }
        catch (error) {
            return {
                status: false,
                errors: [{ code: error.code, detail: error.message }],
            };
        }
        return {
            status: false,
            errors: [errors_1.default.UNKNOWN],
        };
    }
    getStupFileData(command) {
        let stup = this.readStupFile();
        for (const [key, value] of Object.entries(command)) {
            stup = stup.replaceAll("{{" + key + "}}", value);
        }
        return stup;
    }
    /**
     *
     * @param result
     * @param message
     * @returns
     */
    log(result, message) {
        if (message) {
            console.log(message);
            return;
        }
        if (!result.status) {
            console.log(result.errors
                ?.map((result) => {
                return `code: ${result.code} message: ${result.detail}`;
            })
                .join("\n"));
        }
    }
    /**
     *
     * @param str
     * @returns
     */
    toCamelCase(str) {
        return str.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
    }
    /**
     *
     * @param str
     * @returns
     */
    toKebabCase(str) {
        return str
            .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
            .replace(/^-/, "");
    }
}
exports.CommandHelper = CommandHelper;
