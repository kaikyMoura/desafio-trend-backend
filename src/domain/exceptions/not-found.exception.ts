/**
 * NotFoundException is a custom exception that is thrown when a resource is not found.
 * @description This exception is thrown when a resource is not found.
 * @example
 * throw new NotFoundException("User not found", 404, "USER_NOT_FOUND");
 */
export class NotFoundException extends Error {
    constructor(message: string, public readonly statusCode: number, public readonly code?: string, public readonly data?: unknown) {
        super(message);
        this.name = "NotFoundException";
    }
}
