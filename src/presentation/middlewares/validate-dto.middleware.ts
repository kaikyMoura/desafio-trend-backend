import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { IErrorDetail } from "../../domain/interfaces/api-response.interface";

/**
 * Converts query parameters like where[name]=value to nested objects
 * @param query - The query object from Express
 * @returns The converted object with proper nesting
 */
function convertQueryParams(query: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  // Regular expression to match nested parameters
  const NESTED_PARAM_REGEX = /^(\w+)\[(\w+)\]$/;

  for (const [key, value] of Object.entries(query)) {
    if (key.includes('[') && key.includes(']')) {
      // Handle nested parameters like where[name], where[email], etc.
      const match = key.match(NESTED_PARAM_REGEX);
      if (match) {
        const [, parentKey, childKey] = match;
        if (parentKey && childKey) {
          if (!result[parentKey] || typeof result[parentKey] !== 'object') {
            result[parentKey] = {};
          }
          (result[parentKey] as Record<string, unknown>)[childKey] = value;
        }
      }
    } else {
      // Handle regular parameters
      result[key] = value;
    }
  }
  
  return result;
}

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

    // Convert query parameters if it's a query object
    let processedPayload: unknown = payload;
    if (typeof payload === 'object' && payload !== null && 'where' in payload === false) {
      // Check if this looks like a query object with nested parameters
      const hasNestedParams = Object.keys(payload).some(key => key.includes('['));
      if (hasNestedParams) {
        processedPayload = convertQueryParams(payload as Record<string, unknown>);
        console.log('🔧 Converted query params:', { original: payload, converted: processedPayload });
      }
    }

    // Convert the payload to an instance of the DTO class
    const dtoObj = plainToInstance<T, unknown>(dtoClass, processedPayload);
    
    // Verify if the conversion was successful
    if (!dtoObj) {
      throw new Error("Failed to convert payload to DTO instance");
    }

    // Validate the DTO instance
    const errors = await validate(dtoObj as object);
    
    // If there are errors, throw them with detailed information
    if (errors.length > 0) {
      console.log('🔍 Validation errors found:', errors.length);
      errors.forEach((err, index) => {
        console.log(`❌ Error ${index + 1}:`, {
          property: err.property,
          value: err.value,
          constraints: err.constraints,
          target: err.target
        });
      });
      
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
