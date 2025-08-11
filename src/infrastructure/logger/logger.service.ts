import { ILoggerService } from "@/domain/interfaces/logger.service.interface";
import winston, { Logger } from "winston";
import path from "path";
import fs from "fs";

/**
 * LoggerService is a class that implements the ILoggerService interface.
 * @description This class is used to log messages to the console and to a file.
 */
export class LoggerService implements ILoggerService {
  private readonly logger: Logger;

  /**
   * Constructor for the LoggerService class.
   * @description This constructor creates a logger instance with the specified configuration.
   */
  constructor() {
    // Ensure logs directory exists
    const logsDir = path.join(process.cwd(), 'logs');
    
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        new winston.transports.File({ 
          filename: path.join(logsDir, 'error.log'), 
          level: 'error' 
        }),
        new winston.transports.File({ 
          filename: path.join(logsDir, 'combined.log') 
        })
      ]
    });
  }

  /**
   * Logs a message to the console and to a file.
   * @param message - The message to log.
   * @param context - The context of the message.
   * @param meta - Additional metadata to log.
   */
  public log(message: string, context?: string, meta?: Record<string, unknown>) {
    this.logger.info(message, { context, ...meta });
  }

  /**
   * Logs an info message to the console and to a file.
   * @param message - The message to log.
   * @param context - The context of the message.
   * @param meta - Additional metadata to log.
   */
  public info(message: string, context?: string, meta?: Record<string, unknown>) {
    this.logger.info(message, { context, ...meta });
  }

  /**
   * Logs an error message to the console and to a file.
   * @param message - The message to log.
   * @param context - The context of the message.
   * @param meta - Additional metadata to log.
   */
  public error(message: string, context?: string, meta?: Record<string, unknown>) {
    this.logger.error(message, { context, ...meta });
  }

  /**
   * Logs a warning message to the console and to a file.
   * @param message - The message to log.
   * @param context - The context of the message.
   * @param meta - Additional metadata to log.
   */
  public warn(message: string, context?: string, meta?: Record<string, unknown>) {
    this.logger.warn(message, { context, ...meta });
  }

  /**
   * Logs a debug message to the console and to a file.
   * @param message - The message to log.
   * @param context - The context of the message.
   * @param meta - Additional metadata to log.
   */
  public debug(message: string, context?: string, meta?: Record<string, unknown>) {
    this.logger.debug(message, { context, ...meta });
  }
}
