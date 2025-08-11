import { Request, Response, RequestHandler, NextFunction } from "express";
import { validateDto } from "./validate-dto.middleware";

/**
 * validationMiddleware is a middleware that validates the DTO and calls the custom handler.
 * @param dtoClass - The DTO class for validation.
 * @returns The middleware function.
 */ 
export function validationMiddleware<T>(
  dtoClass: new () => T,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!dtoClass || typeof dtoClass !== 'function') {
        const error = new Error("Invalid DTO class provided");
        error.name = "ValidationError";
        return next(error);
      }

      // For GET requests, use query parameters instead of body
      const payload = req.method === 'GET' ? req.query : req.body;
      
      const dtoObject = await validateDto(dtoClass, payload);

      // Store the validated data in req.body for both GET and POST/PUT
      // This allows the controller to access the validated data consistently
      req.body = dtoObject;

      next();
    } catch (error) {
      if (error instanceof Error) {
        error.name = "ValidationError";
      }
      next(error);
    }
  };
}
