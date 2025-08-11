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
