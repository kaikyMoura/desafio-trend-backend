import { Client, Prisma } from "@prisma/client";
import { IPrismaClientRepository } from "../../domain/interfaces/client.repository.interface";
import { PrismaService } from "../database/prisma.service";

/**
 * PrismaClientRepository is a repository that uses Prisma to interact with the database.
 * @description This repository is used to create, find, update and delete clients.
 */
export class PrismaClientRepository implements IPrismaClientRepository {
    constructor(private readonly prisma: PrismaService) {}

    /**
     * Create a new client in the database.
     * @param client - The client to create.
     * @returns The created client.
     */
    async create(client: Prisma.ClientCreateInput): Promise<Client> {
        return this.prisma.client.create({
            data: client
        });
      }

    /**
     * Find all clients in the database.
     * @param args - The filter to use.
     * @returns All clients, a empty array or a array with filtered clients.
     */
    async findMany(args?: Prisma.ClientFindManyArgs): Promise<Client[]> {
        return this.prisma.client.findMany(args);
    }

    /**
     * Find a client by its id.
     * @param id - The id of the client to find.
     * @returns The client.
     */
    async findById(id: string): Promise<Client | null> {
        return this.prisma.client.findUnique({ where: { id } });
    }

    /**
     * Find a client by its email.
     * @param email - The email of the client to find.
     * @returns The client.
     */
    async findByEmail(email: string): Promise<Client | null> {
        return this.prisma.client.findUnique({ where: { email } });
    }

    /**
     * Update a client in the database.
     * @param id - The id of the client to update.
     * @param client - The client to update.
     * @returns The updated client.
     */
    async update(id: string, client: Client): Promise<Client> {
        return this.prisma.client.update({ where: { id }, data: client });
    }

    /**
     * Delete a client in the database.
     * @param id - The id of the client to delete.
     * @returns The deleted client.
     */
    async delete(id: string): Promise<void> {
        await this.prisma.client.delete({ where: { id } });
    }

    /**
     * Count all clients in the database.
     * @returns The number of clients.
     */
    async count(): Promise<number> {
        return this.prisma.client.count();
    }
}

export const prismaClientRepository = new PrismaClientRepository(new PrismaService());