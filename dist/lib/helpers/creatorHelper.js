"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommandDescription = exports.generateCommandName = void 0;
const slugify_1 = __importDefault(require("slugify"));
/**
 *
 * @param className
 * @returns
 */
function generateCommandName(className) {
    return (0, slugify_1.default)(className);
}
exports.generateCommandName = generateCommandName;
/**
 *
 * @param className
 * @returns
 */
function generateCommandDescription(className) {
    return `${className} | Enter a description for this command.`;
}
exports.generateCommandDescription = generateCommandDescription;
