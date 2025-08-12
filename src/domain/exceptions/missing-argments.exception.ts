/**
 * MissingRequiredArgumentsException is a custom exception that is thrown when a required argument is missing.
 * @description This exception is thrown when a required argument is missing.
 * @example
 * throw new MissingRequiredArgumentsException("Id is required", "MISSING_ARGUMENTS", 400, ["id"]);
 */
export class MissingRequiredArgumentsException extends Error {
    constructor(
        message: string,
        public readonly statusCode: number,
        public readonly code?: string,
        public readonly missingArgs?: string[]
    ) {
        super(message);
        this.name = "MissingRequiredArgumentsException";
    }
}
