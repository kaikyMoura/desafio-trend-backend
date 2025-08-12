import { Client } from "@/domain/entities/client.entity";

/**
 * PageClientDto is a DTO that is used to paginate clients.
 * @property data - The data of the clients.
 * @property total - The total of clients.
 * @property page - The page number.
 * @property limit - The limit of clients per page.
 * @property orderBy - The order by to use.
 * @property totalPages - The total of pages.
 * @description This DTO is used to paginate clients
 * @example
 * {
 *  data: [],
 *  total: 10,
 *  page: 1,
 *  limit: 10,
 *  orderBy: 'asc',
 *  sort: 'createdAt',
 *  totalPages: 1
 * }
 */
export class PageClientDto {
  /**
   * The data of the clients.
   */
  data!: Client[];
  /**
   * The total of clients.
   */
  total?: number;
  /**
   * The page number.
   */
  page?: number;
  /**
   * The limit of clients per page.
   */
  limit?: number;
  /**
   * The order by to use.
   */
  orderBy?: 'asc' | 'desc';
  /**
   * The sort to use.
   */
  sort?: string;
  /**
   * The total of pages.
   */
  totalPages?: number;
}
