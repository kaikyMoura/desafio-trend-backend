/**
 * ClientResponse is a DTO that is used to return a response from the API.
 * @description This DTO is used to return a response from the API.
 * @example
 * {
 *  data: Client,
 *  message: "Client created successfully",
 *  statusCode: 201,
 * }
 */
export class ClientResponseDto<T> {
    constructor(
        public message: string,
        public statusCode: number,
        public data: T | null,
        public timestamp: string = new Date().toISOString(),
    ) {}
}
