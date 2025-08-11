import { ILoggerService } from "@/domain/interfaces/logger.service.interface";
import { Request, Response, NextFunction } from "express";

/**
 * loggerMiddleware is a middleware that logs the request and response.
 * @param logger - The logger service.
 * @returns The middleware function.
 */
export function loggerMiddleware(logger: ILoggerService) {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`, `${req.method} ${req.url}`);
    next();
  };
}