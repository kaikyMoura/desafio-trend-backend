/**
 * ApiResponse is a generic interface that is used to return a response from the API.
 * @description This interface is used to return a response from the API.
 * @example
 * {
 *  data: {
 *  message: "User created successfully",
 *  statusCode: 201
 * }
 */
export interface IApiResponse<T> {
    data?: T;
    message?: string;
    statusCode?: number;
    error?: string;
}

/**
 * ErrorDetail represents a single validation error detail
 */
export interface IErrorDetail {
    field: string;
    message: string;
}

/**
 * ErrorResponse represents the standard error response format
 */
export interface IErrorResponse {
    error: string;
    code: string;
    details?: IErrorDetail[];
}
