import { NextFunction, Request, Response } from "express";

/**
 * errorHandler is a middleware that handles errors globally.
 * @description This middleware is used to handle errors across the entire application.
 * @param error - The error object.
 * @param req - The request object.
 * @param res - The response object.
 */
export function errorHandler(
  error: Error, 
  req: Request, 
  res: Response,
  next: NextFunction
) {
  console.error(error.stack);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  
  if (error.name === 'NotFoundException') {
    return res.status(404).json({ error: error.message });
  }
  
  if (error.name === 'MissingRequiredArgumentsException') {
    return res.status(400).json({ error: error.message });
  }
  
  res.status(500).json({ error: "Internal server error", code: "INTERNAL_SERVER_ERROR" });
}