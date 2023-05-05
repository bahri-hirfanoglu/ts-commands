"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLog = void 0;
class ConsoleLog {
    clear() {
        console.clear();
    }
    debug(message, metadata) {
        console.info(`[DEBUG] ${message}`, metadata);
    }
    info(message, metadata) {
        console.info(message, metadata);
    }
    warning(message, metadata) {
        console.warn(message, metadata);
    }
    error(message, metadata) {
        console.error(message, metadata);
    }
}
exports.ConsoleLog = ConsoleLog;
