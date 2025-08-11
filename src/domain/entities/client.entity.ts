/**
 * Client domain object
 * @description This class is used to represent a client in the system
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
  complement: string;
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
    this.complement = props.complement;
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