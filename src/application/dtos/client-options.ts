import { Transform, Type } from "class-transformer";
import { IsIn, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ClientFilterDto } from "./client-filter.dto";

/**
 * ClientOptionsDto is a DTO that is used to filter clients.
 * @description This DTO is used to filter clients by name, email, phone and cnpj.
 * @example
 * {
 *  where: {
 *    cnpj: "1234567890"
 *  },
 *  page: 1,
 *  limit: 10,
 *  orderBy: 'asc',
 *  search: "joão",
 *  sort: "name"
 * }
 */
export class ClientOptionsDto {
  /**
   * The filter to use.
   */
  @ValidateNested()
  @Type(() => ClientFilterDto)
  @IsObject()
  @IsOptional()
  where?: ClientFilterDto;

  /**
   * The page number.
   */
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page?: number;

  /**
   * The limit of clients per page.
   */
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  limit?: number;

  /**
   * Search term for filtering clients.
   */
  @IsString({ message: "Search must be a string" })
  @IsOptional()
  search?: string;

  /**
   * Field to sort by.
   */
  @IsIn(['name', 'email', 'cnpj', 'phone', 'sector', 'cep', 'address', 'number', 'neighborhood', 'city', 'state', 'complement', 'createdAt', 'updatedAt'], { message: "Sort must be one of: name, email, cnpj, phone, sector, cep, address, number, neighborhood, city, state, complement, createdAt, updatedAt" })
  @IsOptional()
  sort?: 'name' | 'email' | 'cnpj' | 'phone' | 'sector' | 'cep' | 'address' | 'number' | 'neighborhood' | 'city' | 'state' | 'complement' | 'createdAt' | 'updatedAt';

  /**
   * The order by to use.
   * @default 'asc'
   */
  @IsIn(['asc', 'desc'], { message: "OrderBy must be 'asc' or 'desc'" })
  @IsOptional()
  orderBy?: 'asc' | 'desc';
}