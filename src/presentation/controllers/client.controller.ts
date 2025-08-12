import { ClientOptionsDto } from "@/application/dtos/client-options";
import { ClientResponseDto } from "@/application/dtos/client-response.dto";
import { CreateClientDto } from "@/application/dtos/create-client.dto";
import { UpdateClientDto } from "@/application/dtos/update-client.dto";
import { Client } from "@/domain/entities/client.entity";
import { MissingRequiredArgumentsException } from "@/domain/exceptions/missing-argments.exception";
import clientService, { ClientService } from "@/infrastructure/services/client.service";
import { NextFunction, Request, Response } from "express";


const sendJson = (res: Response, statusCode: number = 200, data?: unknown) => {
    res.status(statusCode).json(data);
}

/**
 * UserController is a class that handles the user-related requests.
 * @description This class handles the user-related requests.
 */
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    /**
     * createUser is a method that creates a user.
     * @description This method creates a user.
     * @param req - The request object.
     * @param res - The response object.
     * @param body - The body of the request.
     */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const client = await this.clientService.create(req.body as CreateClientDto);

            const response = new ClientResponseDto("Client created successfully", 201, client);

            sendJson(res, 201, response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * findAll is a method that finds all users.
     * @description This method finds all users.
     * @param req - The request object.
     * @param res - The response object.
     */
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            // Use validated data from req.body if available, otherwise fallback to req.query
            const options = req.body && Object.keys(req.body).length > 0 
                ? req.body as ClientOptionsDto 
                : req.query as ClientOptionsDto;

            const clients = await this.clientService.findMany(options);

            if (!clients || clients.data.length === 0) {
                return res.status(404).json({ error: "No clients found" });
            }

            sendJson(res, 200, clients);
        } catch (error) {
            next(error);
        }
    }

    /**
     * findByEmail is a method that finds a user by email.
     * @description This method finds a user by email.
     * @param req - The request object.
     * @param res - The response object.
     * @param email - The email of the user.
     */
    async findByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.params.email;
            if (!email) {
                throw new MissingRequiredArgumentsException(
                    "Email parameter is required", 
                    400, 
                    "MISSING_EMAIL", 
                    ["email"]
                );
            }

            const client = await this.clientService.findByEmail(email);

            const response = new ClientResponseDto<Client>("Client found successfully", 200, client);

            sendJson(res, 200, response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * findById is a method that finds a user by id.
     * @description This method finds a user by id.
     * @param req - The request object.
     * @param res - The response object.
     * @param id - The id of the user.
     */
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!id) {
                throw new MissingRequiredArgumentsException(
                    "ID parameter is required", 
                    400, 
                    "MISSING_ID", 
                    ["id"]
                );
            }

            const client = await this.clientService.findById(id);

            const response = new ClientResponseDto<Client>("Client found successfully", 200, client);

            sendJson(res, 200, response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * update is a method that updates a user.
     * @description This method updates a user.
     * @param req - The request object.
     * @param res - The response object.
     * @param id - The id of the user.
     * @param body - The body of the user.
     */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!id) {
                throw new MissingRequiredArgumentsException(
                    "ID parameter is required", 
                    400, 
                    "MISSING_ID", 
                    ["id"]
                );
            }

            const client = await this.clientService.update(id, req.body as UpdateClientDto);

            const response = new ClientResponseDto("Client updated successfully", 200, client);

            sendJson(res, 200, response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * delete is a method that deletes a user.
     * @description This method deletes a user.
     * @param req - The request object.
     * @param res - The response object.
     * @param id - The id of the user.
     */
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!id) {
                throw new MissingRequiredArgumentsException(
                    "ID parameter is required", 
                    400, 
                    "MISSING_ID", 
                    ["id"]
                );
            }

            await this.clientService.delete(id);

            sendJson(res, 204, { message: "Client deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}

export default new ClientController(clientService);