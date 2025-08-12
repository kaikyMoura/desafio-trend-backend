import { Client, Prisma } from "@prisma/client";

/**
 * Client repository interface
 * @description This interface is used to define the methods that a client repository must implement
 * @example
 * const clientRepository: IClientRepository = new ClientRepository();
 */
export interface IPrismaClientRepository {
  /**
   * Create a new client in the database.
   * @param client - The client to create.
   * @returns The created client.
   */
  create(client: Prisma.ClientCreateInput): Promise<Client>;

  /**
   * Find all clients in the database.
   * @returns All clients.
   */
  findMany(args?: Prisma.ClientFindManyArgs): Promise<Client[]>;

  /**
   * Find a client by its id.
    * @param id - The id of the client to find.
   * @returns The client.
   */
  findById(id: string): Promise<Client | null>;

  /**
   * Find a client by its email.
   * @param email - The email of the client to find.
   * @returns The client.
   */
  findByEmail(email: string): Promise<Client | null>;

  /**
   * Find a client by its CNPJ.
   * @param cnpj - The CNPJ of the client to find.
   * @returns The client.
   */
  findByCnpj(cnpj: string): Promise<Client | null>;

  /**
   * Find a client by its name.
   * @param name - The name of the client to find.
   * @returns The client.
   */
  findByPhone(name: string): Promise<Client | null>;

  /**
   * Update a client in the database.
   * @param id - The id of the client to update.
   * @param client - The client to update.
   * @returns The updated client.
   */
  update(id: string, client: Partial<Client>): Promise<Client>;

  /**
   * Delete a client in the database.
   * @param id - The id of the client to delete.
   * @returns The deleted client.
   */
  delete(id: string): Promise<void>;

  /**
   * Count all clients in the database.
   * @returns The number of clients.
   */
  count(): Promise<number>;
}