import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { IErrorDetail, IErrorResponse } from "../../domain/interfaces/api-response.interface";

/**
 * errorHandler is a middleware that handles errors globally.
 * @description This middleware is used to handle errors across the entire application.
 * @param error - The error object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error.stack);

  if (error.name === 'ValidationError') {
    const errorResponse: IErrorResponse = {
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      details: (error as Error & { details?: IErrorDetail[] }).details || []
    };
    return res.status(400).json(errorResponse);
  }

  if (error.name === 'NotFoundException') {
    const errorResponse: IErrorResponse = {
      error: error.message,
      code: "NOT_FOUND",
      details: []
    };
    return res.status(404).json(errorResponse);
  }

  if (error.name === 'MissingRequiredArgumentsException') {
    const missingArgs = (error as Error & { missingArgs?: string[] }).missingArgs || [];
    const errorResponse: IErrorResponse = {
      error: `Missing required arguments: ${missingArgs.join(', ')}`,
      code: "MISSING_ARGUMENTS",
      details: missingArgs.map((arg: string) => ({
        field: arg,
        message: `The field '${arg}' is required`
      }))
    };
    return res.status(400).json(errorResponse);
  }

  // Para erros de JSON malformado
  if (error instanceof SyntaxError && error.message.includes('JSON')) {
    const errorResponse: IErrorResponse = {
      error: "Invalid JSON format",
      code: "INVALID_JSON",
      details: [{
        field: "body",
        message: "The request body contains invalid JSON"
      }]
    };
    return res.status(400).json(errorResponse);
  }

  // Para outros tipos de erro, mostrar uma mensagem mais amigável
  const errorResponse: IErrorResponse = {
    error: "Something went wrong",
    code: "INTERNAL_ERROR",
    details: [{
      field: "server",
      message: "An unexpected error occurred. Please try again later."
    }]
  };

  res.status(500).json(errorResponse);
};