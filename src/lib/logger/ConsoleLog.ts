import { Logger } from './ILogger';
import { IClearable } from './IClearable';
export class ConsoleLog implements Logger, IClearable {
  clear() {
    console.clear();
  }
  debug(message: string, metadata?: Record<string, unknown>) {
    console.info(`[DEBUG] ${message}`, metadata);
  }
  info(message: string, metadata?: Record<string, unknown>) {
    console.info(message, metadata);
  }
  warning(message: string, metadata?: Record<string, unknown>) {
    console.warn(message, metadata);
  }
  error(message: string, metadata?: Record<string, unknown>) {
    console.error(message, metadata);
  }
}
