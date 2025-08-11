/**
 * ILoggerService is an interface that defines the methods for a logger service.
 * @description This interface defines the methods for a logger service.
 */
export interface ILoggerService {
  log(message: string, context?: string, meta?: Record<string, unknown>): void;
  info(message: string, context?: string, meta?: Record<string, unknown>): void;
  error(message: string, context?: string, meta?: Record<string, unknown>): void;
  warn(message: string, context?: string, meta?: Record<string, unknown>): void;
  debug(message: string, context?: string, meta?: Record<string, unknown>): void;
}