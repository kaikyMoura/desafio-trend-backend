import { IsEmail, IsOptional, IsString } from "class-validator";

/**
 * Update client DTO
 * @description This DTO is used to update a client
 * @example
 * const updateClientDto = new UpdateClientDto({
 *   name: "John Doe",
 *   email: "john.doe@example.com",
 *   phone: "1234567890"
 * });
 */
export class UpdateClientDto {
  @IsString({ message: "Name must be a string" })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: "Email must be a valid email" })
  @IsOptional()
  email?: string;

  @IsString({ message: "Phone must be a string" })
  @IsOptional()
  phone?: string;

  @IsString({ message: "Cnpj must be a string" })
  @IsOptional()
  cnpj?: string;

  @IsString({ message: "Cep must be a string" })
  @IsOptional()
  cep?: string;

  @IsString({ message: "Address must be a string" })
  @IsOptional()
  address?: string;

  @IsString({ message: "Number must be a string" })
  @IsOptional()
  number?: string;

  @IsString({ message: "Complement must be a string" })
  @IsOptional()
  complement?: string;

  @IsString({ message: "Neighborhood must be a string" })
  @IsOptional()
  neighborhood?: string;

  @IsString({ message: "City must be a string" })
  @IsOptional()
  city?: string;

  @IsString({ message: "State must be a string" })
  @IsOptional()
  state?: string;

  @IsString({ message: "Sector must be a string" })
  @IsOptional()
  sector?: string;
}