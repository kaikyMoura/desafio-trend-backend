import { ClientOptionsDto } from "@/application/dtos/client-options";
import { CreateClientDto } from "@/application/dtos/create-client.dto";
import { PageClientDto } from "@/application/dtos/page-client.dto";
import { UpdateClientDto } from "@/application/dtos/update-client.dto";
import { Client } from "@/domain/entities/client.entity";
import { MissingRequiredArgumentsException } from "@/domain/exceptions/missing-argments.exception";
import { NotFoundException } from "@/domain/exceptions/not-found.exception";
import { IPrismaClientRepository } from "@/domain/interfaces/client.repository.interface";
import { ILoggerService } from "@/domain/interfaces/logger.service.interface";
import { ClientMapper } from "@/domain/mappers/client.mapper";
import { LoggerService } from "../logger/logger.service";
import prismaClientRepository from "../repositories/client.repository";
import { Prisma } from "@prisma/client";


/**
 * UserService is a service that uses a user repository to interact with the database.
 * @description This service is used to create, find, update and delete users.
 */
export class ClientService {
    private readonly name = "ClientService";

    /**
     * Constructor for the UserService class.
     * @param userRepository - The user repository.
     * @param logger - The logger service.
     */
    constructor(private readonly clientRepository: IPrismaClientRepository, private readonly logger: ILoggerService) { }

    /**
     * Create a new client.
     * @param client - The client to create.
     * @returns The created client.
     */
    async create(client: CreateClientDto): Promise<Partial<Client>> {
        this.logger.info("Creating client", `${this.name}.create`, { client });

        // Map the client to the Prisma ClientCreateInput type
        const clientDomain = ClientMapper.toCreateInput(client);

        const createdClient = await this.clientRepository.create(clientDomain);

        this.logger.info("Client created", `${this.name}.create`, { client: createdClient });
        // Map the created client to a Partial<Client>
        return ClientMapper.toPublic(createdClient);
    }

    /**
     * Find many clients.
     * @param options - The options to use.
     * @returns All clients.
     */
    async findMany(options?: ClientOptionsDto): Promise<PageClientDto> {
        const {
            page = 1,
            limit = 10,
            sort = "createdAt",
            orderBy = "asc",
            where,
            search,
        } = options ?? {};

        this.logger.info("Finding many clients", `${this.name}.findMany`, { options });

        // Monta filtro dinâmico
        const finalWhere = where ?? this.buildSearchFilter(search);
        
        this.logger.info("Filter configuration", `${this.name}.findMany`, { 
            originalWhere: where, 
            search, 
            finalWhere,
            hasWhereFilter: !!where,
            hasSearchFilter: !!search
        });

        // Executa consultas em paralelo
        const [total, clients] = await Promise.all([
            this.count(),
            this.clientRepository.findMany({
                where: finalWhere,
                orderBy: { [sort]: orderBy },
                skip: (page - 1) * limit,
                take: limit,
            }),
        ]);

        if (!clients.length) {
            this.logger.warn("No clients found", `${this.name}.findMany`, { where: finalWhere });
        } else {
            this.logger.info("Clients found", `${this.name}.findMany`, { count: clients.length });
        }

        return {
            data: clients,
            total,
            page,
            limit,
            orderBy: orderBy,
            sort: sort,
            totalPages: Math.ceil(total / limit),
        };
    }

    /**
     * Find a client by its id.
     * @param id - The id of the client to find.
     * @returns The client.
     */
    async findById(id: string): Promise<Client> {
        this.logger.info("Finding client by id", `${this.name}.findById`, { id });

        if (!id) {
            this.logger.error("Id is required", `${this.name}.findById`, { id });
            throw new MissingRequiredArgumentsException("Id is required", 400, "MISSING_ARGUMENTS");
        }

        const client = await this.clientRepository.findById(id);

        if (!client) {
            this.logger.error("Client not found", `${this.name}.findById`, { id });
            throw new NotFoundException("Client not found", 404, "CLIENT_NOT_FOUND");
        }

        this.logger.info("Client found", `${this.name}.findById`, { client });

        return client;
    }

    /**
     * Find a client by its email.
     * @param email - The email of the client to find.
     * @returns The client.
     */
    async findByEmail(email: string): Promise<Client> {
        this.logger.info("Finding client by email", `${this.name}.findByEmail`, { email });

        if (!email) {
            this.logger.error("Email is required", `${this.name}.findByEmail`, { email });
            throw new MissingRequiredArgumentsException("Email is required", 400, "MISSING_ARGUMENTS");
        }

        const client = await this.clientRepository.findByEmail(email);

        if (!client) {
            this.logger.error("Client not found", `${this.name}.findByEmail`, { email });
            throw new NotFoundException("Client not found", 404, "CLIENT_NOT_FOUND");
        }

        this.logger.info("Client found", `${this.name}.findByEmail`, { client });

        return client;
    }

    /**
     * Find a client by its CNPJ.
     * @param cnpj - The CNPJ of the client to find.
     * @returns The client.
     */
    async findByCnpj(cnpj: string): Promise<Client> {
        this.logger.info("Finding client by CNPJ", `${this.name}.findByCnpj`, { cnpj });

        if (!cnpj) {
            this.logger.error("CNPJ is required", `${this.name}.findByCnpj`, { cnpj });
            throw new MissingRequiredArgumentsException("CNPJ is required", 400, "MISSING_ARGUMENTS");
        }

        const client = await this.clientRepository.findByCnpj(cnpj);

        if (!client) {
            this.logger.error("Client not found", `${this.name}.findByCnpj`, { cnpj });
            throw new NotFoundException("Client not found", 404, "CLIENT_NOT_FOUND");
        }

        this.logger.info("Client found", `${this.name}.findByCnpj`, { client });

        return client;
    }

    /**
     * Check if a CNPJ exists (for validation purposes).
     * @param cnpj - The CNPJ to check.
     * @returns True if the CNPJ exists, false otherwise.
     */
    async existsByCnpj(cnpj: string): Promise<boolean> {
        this.logger.info("Checking if CNPJ exists", `${this.name}.existsByCnpj`, { cnpj });

        if (!cnpj) {
            this.logger.info("CNPJ is empty, returning false", `${this.name}.existsByCnpj`, { cnpj });
            return false;
        }

        try {
            this.logger.info('🔍 Calling repository.findByCnpj with:', `${this.name}.existsByCnpj`, { cnpj });
            const client = await this.clientRepository.findByCnpj(cnpj);
            const exists = !!client;
            this.logger.info('📋 Repository result:', `${this.name}.existsByCnpj`, { cnpj, client: !!client, exists });
            return exists;
        } catch (error) {
            this.logger.error("Error checking CNPJ existence", `${this.name}.existsByCnpj`, { cnpj, error });
            this.logger.error('❌ Error in existsByCnpj:', `${this.name}.existsByCnpj`, { cnpj, error });
            return false;
        }
    }

    /**
     * Check if an email exists (for validation purposes).
     * @param email - The email to check.
     * @returns True if the email exists, false otherwise.
     */
    async existsByEmail(email: string): Promise<boolean> {
        this.logger.info("Checking if email exists", `${this.name}.existsByEmail`, { email });

        if (!email) {
            return false;
        }

        try {
            const client = await this.clientRepository.findByEmail(email);
            return !!client;
        } catch (error) {
            this.logger.error("Error checking email existence", `${this.name}.existsByEmail`, { email, error });
            return false;
        }
    }

    /**
     * Find a client by its phone.
     * @param phone - The phone of the client to find.
     * @returns The client.
     */
    async findByPhone(phone: string): Promise<Client> {
        this.logger.info("Finding client by phone", `${this.name}.findByPhone`, { phone });

        if (!phone) {
            this.logger.error("Phone is required", `${this.name}.findByPhone`, { phone });
            throw new MissingRequiredArgumentsException("Phone is required", 400, "MISSING_ARGUMENTS");
        }

        const client = await this.clientRepository.findByPhone(phone);

        if (!client) {
            this.logger.error("Client not found", `${this.name}.findByPhone`, { phone });
            throw new NotFoundException("Client not found", 404, "CLIENT_NOT_FOUND");
        }

        this.logger.info("Client found", `${this.name}.findByPhone`, { client });

        return client;
    }

    /**
     * Update a client.
     * @param id - The id of the client to update.
     * @param client - The client to update.
     * @returns The updated client.
     */
    async update(id: string, client: UpdateClientDto): Promise<Partial<Client>> {
        this.logger.info("Updating client", `${this.name}.update`, { id, client });

        if (!id) {
            this.logger.error("Id is required", `${this.name}.update`, { id, client });
            throw new MissingRequiredArgumentsException("Id is required", 400, "MISSING_ARGUMENTS");
        }

        const clientToUpdate = await this.findById(id);
        if (!clientToUpdate) {
            this.logger.error("Client not found", `${this.name}.update`, { id, client });
            throw new NotFoundException("Client not found", 404, "CLIENT_NOT_FOUND");
        }

        const updatedClient = await this.clientRepository.update(id, { ...client });

        if (!updatedClient) {
            throw new NotFoundException("Client not found", 404, "CLIENT_NOT_FOUND");
        }

        this.logger.info("Client updated", `${this.name}.update`, { id, client: updatedClient });

        return ClientMapper.toPublic(updatedClient);
    }

    /**
     * Delete a client.
     * @param id - The id of the client to delete.
     * @returns The deleted client.
     */
    async delete(id: string): Promise<void> {
        this.logger.info("Deleting client", `${this.name}.delete`, { id });

        if (!id) {
            this.logger.error("Id is required", `${this.name}.delete`, { id });
            throw new MissingRequiredArgumentsException("Id is required", 400, "MISSING_ARGUMENTS");
        }

        const client = await this.findById(id);
        if (!client) {
            this.logger.error("Client not found", `${this.name}.delete`, { id });
            throw new NotFoundException("Client not found", 404, "CLIENT_NOT_FOUND");
        }

        await this.clientRepository.delete(id);

        this.logger.info("Client deleted", `${this.name}.delete`, { id });
    }

    /**
     * Count all clients.
     * @returns The number of clients.
     */
    async count(): Promise<number> {
        this.logger.info("Counting clients", `${this.name}.count`);

        const count = await this.clientRepository.count();

        this.logger.info("Clients counted", `${this.name}.count`, { count });

        return this.clientRepository.count();
    }

    /**
     * Builds a search filter for the client repository.
     * @param search - The search string.
     * @returns The search filter.
   */
    private buildSearchFilter(search?: string) {
        if (!search) return {};

        const searchableFields: (keyof Prisma.ClientWhereInput)[] = [
            "name",
            "email",
            "cnpj",
            "phone",
            "sector",
            "cep",
            "address",
            "number",
            "neighborhood",
            "city",
            "state",
            "complement",
        ];

        return {
            OR: searchableFields.map((field) => ({
                [field]: { contains: search, mode: "insensitive" },
            })),
        };
    }
}

/**
 * clientService is a singleton instance of the ClientService class.
 * @description This service is used to create, find, update and delete clients.
 */
export default new ClientService(prismaClientRepository, new LoggerService());