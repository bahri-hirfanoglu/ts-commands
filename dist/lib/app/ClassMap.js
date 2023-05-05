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
exports.ClassMap = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ClassMap {
    constructor(properties) {
        this.properties = properties;
        this.classes = this.createClassMap();
    }
    // Creates a mapping of class names to their corresponding classes
    createClassMap() {
        // Initialize an empty object to store the class map
        const classMap = {};
        if (!fs.existsSync(this.properties.commandPath)) {
            throw new Error("command path not found");
        }
        // Read the files in the directory containing the commands
        const files = fs.readdirSync(this.properties.commandPath);
        // Iterate through each file
        files.forEach((file) => {
            // Get the file extension
            const extname = path.extname(file);
            // If the file is not a .ts or .js file, skip it
            if (extname !== ".ts" && extname !== ".js") {
                return;
            }
            // Get the class name from the file name (without the extension)
            const className = path.basename(file, extname);
            // Get the module path by joining the commands path with the file name
            const modulePath = path.join(this.properties.commandPath, file);
            // Require the module and get the exported class (if it exists)
            const importedModule = require(modulePath);
            for (const key in importedModule) {
                const exportedClass = importedModule[key];
                // If the exported item is a class with the same name as the file,
                // add it to the class map
                if (typeof exportedClass === "function" &&
                    exportedClass.name === className) {
                    classMap[className] = exportedClass;
                    break;
                }
            }
            // If no exported class with the same name as the file was found, log a warning
            if (!classMap[className]) {
                console.warn(`No exported class found in "${modulePath}" with name "${className}".`);
            }
        });
        // Return the completed class map
        return classMap;
    }
}
exports.ClassMap = ClassMap;
