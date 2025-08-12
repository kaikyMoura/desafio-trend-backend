import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { IErrorDetail } from "../../domain/interfaces/api-response.interface";

/**
 * validateDto is a function that validates a DTO.
 * @description This function validates a DTO.
 * @example
 * const errors = await validateDto(UserDto, { name: "John", email: "john@example.com" });
 * 
 * if (errors.length > 0) {
 *  console.log(errors);
 * } else {
 *  console.log("No errors");
 * }
 */
export async function validateDto<T>(dtoClass: new () => T, payload: unknown): Promise<T> {
  try {
    // Verify if the DTO class was passed correctly
    if (!dtoClass || typeof dtoClass !== 'function') {
      throw new Error("Invalid DTO class provided");
    }

    // For GET requests or when payload is empty, create an empty instance
    if (!payload || (typeof payload === 'object' && Object.keys(payload).length === 0)) {
      const emptyDtoObj = new dtoClass();
      return emptyDtoObj;
    }

    // Convert the payload to an instance of the DTO class
    const dtoObj = plainToInstance<T, unknown>(dtoClass, payload);
    
    // Verify if the conversion was successful
    if (!dtoObj) {
      throw new Error("Failed to convert payload to DTO instance");
    }

    // Validate the DTO instance
    const errors = await validate(dtoObj as object);
    
    // If there are errors, throw them with detailed information
    if (errors.length > 0) {
      const errorDetails: IErrorDetail[] = errors.map(err => ({
        field: err.property,
        message: Object.values(err.constraints ?? {}).join(", ")
      }));
      
      const validationError = new Error("Validation failed");
      (validationError as Error & { details?: IErrorDetail[] }).details = errorDetails;
      validationError.name = "ValidationError";
      throw validationError;
    }
    
    // If there are no errors, return the validated object
    return dtoObj;
  } catch (error: unknown) {
    // Re-throw validation errors
    if (error instanceof Error) {
      throw error;
    }
    // Re-throw unknown errors
    throw new Error("Validation failed");
  }
}
