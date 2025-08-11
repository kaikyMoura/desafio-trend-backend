import { CreateClientDto } from "@/application/dtos/create-client.dto";
import { Prisma, Client as PrismaClient } from "@prisma/client";
import { Client } from "../entities/client.entity";

/**
 * Mapper class for the Client domain object
 * @description This class is used to map the Client domain object to a Prisma ClientCreateInput and vice versa
 * @example
 * const client = ClientMapper.toDomain(prismaClient);
 * const prismaClient = ClientMapper.toPersistence(client);
 */
export class ClientMapper {

    /**
     * Map a Prisma CreateClientDto to a Client domain object
     * @param client - The Prisma ClientCreateInput to map
     * @returns The mapped Client domain object
     */
  static toDomain(client: PrismaClient): Client {
    return new Client({
        ...client,
        deletedAt: client.deletedAt   
    });
  }

  /**
   * Map a Client domain object to a Prisma ClientCreateInput
   * @param client - The Client domain object to map
   * @returns The mapped Prisma ClientCreateInput
   */
  static toPersistence(client: Client): PrismaClient {    
    return {
        ...client,
        id: client.id,
        email: client.email ?? null,
        phone: client.phone ?? null,
        createdAt: client.createdAt ?? new Date(),
        updatedAt: client.updatedAt ?? new Date(),
        deletedAt: client.deletedAt ?? null
    };
  }

  /**
   * Map a Client domain object to a Prisma ClientCreateInput
   * @param client - The Client domain object to map
   * @returns The mapped Prisma ClientCreateInput
   */
  static toCreateInput(client: CreateClientDto): Prisma.ClientCreateInput {
    return {
        ...client,
        number: client.number,
        createdAt: new Date(),
        updatedAt: new Date()
    };
  }

  /**
   * Map a Client domain object to a Partial<Client>
   * @param client - The Client domain object to map
   * @returns The mapped Partial<Client>
   */
  static toPublic(client: Client): Partial<Client> {
    return {
        ...client,
        name: client.name,
        email: client.email ?? null,
        phone: client.phone ?? null,
    };
  }
}