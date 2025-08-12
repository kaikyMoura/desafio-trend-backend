/**
 * Client domain object
 * @description This class is used to represent a client in the system
 * @property {string} id - The id of the client
 * @property {string} name - The name of the client
 * @property {string} email - The email of the client
 * @property {string} cnpj - The CNPJ of the client
 * @property {string} phone - The phone of the client
 * @property {string} cep - The CEP of the client
 * @property {string} address - The address of the client
 * @property {string} number - The number of the client
 * @property {string} complement - The complement of the client
 * @property {string} neighborhood - The neighborhood of the client
 * @property {string} city - The city of the client
 * @property {string} state - The state of the client
 * @property {string} sector - The sector of the client
 * @property {Date} createdAt - The date the client was created
 * @property {Date} updatedAt - The date the client was updated
 * @property {Date} deletedAt - The date the client was deleted
 *
 * @example
 * const client = new Client({
 *   id: '1',
 *   name: 'John Doe',
 *   email: 'john.doe@example.com',
 *   cnpj: '12345678901234',
 *   phone: '1234567890',
 *   cep: '1234567890',
 *   address: '1234567890',
 *   number: '1234567890',
 *   complement: '1234567890',
 *   neighborhood: '1234567890',
 *   city: '1234567890',
 *   state: '1234567890',
 *   createdAt: new Date(),
 *   updatedAt: new Date(),
 *   deletedAt: null
 * });
 */
export class Client {
  id: string;
  name: string;
  email?: string | null;
  cnpj: string;
  phone?: string | null;
  cep: string;
  address: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  sector: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  constructor(props: Client) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email ?? null;
    this.phone = props.phone ?? null;
    this.cnpj = props.cnpj;
    this.cep = props.cep;
    this.address = props.address;
    this.number = props.number;
    this.complement = props.complement ?? null;
    this.neighborhood = props.neighborhood;
    this.city = props.city;
    this.state = props.state;
    this.sector = props.sector;
  }

  /**
   * Check if the user is active
   * @returns true if the user is active, false otherwise
   */
  isActive?(): boolean {
    return this.deletedAt === null || this.deletedAt === undefined;
  }

  /**
   * Check if the user is deleted
   * @returns true if the user is deleted, false otherwise
   */
  isDeleted?(): boolean {
    return this.deletedAt !== null && this.deletedAt !== undefined;
  }
}