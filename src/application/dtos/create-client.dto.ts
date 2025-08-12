import { UniqueCnpj } from "@/domain/validators/unique-cnpj.validator";
import { IsUniqueEmail } from "@/domain/validators/unique-email.validator";
import { IsValidCnpj } from "@/domain/validators/valid-cnpj.validator";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";

/**
 * Create client DTO
 * @description This DTO is used to create a client with proper field length validation
 * @example
 * const createClientDto = new CreateClientDto({
 *   name: "João Silva",                    // Max: 255 chars
 *   email: "joao@example.com",             // Max: 255 chars (optional)
 *   phone: "(11) 99999-9999",             // Max: 15 chars (optional)
 *   cnpj: "12.345.678/0001-90",          // 18 chars (formatted) -> stored as 14 digits
 *   cep: "01234-567",                     // Exactly: 8 chars
 *   address: "Rua das Flores, 123",       // Max: 255 chars
 *   number: "123",                         // Max: 10 chars
 *   complement: "Apto 45",                // Max: 255 chars (optional)
 *   neighborhood: "Centro",               // Max: 255 chars
 *   city: "São Paulo",                    // Max: 255 chars
 *   state: "SP",                          // Exactly: 2 chars
 *   sector: "Technology"                  // Max: 255 chars
 * });
 */
export class CreateClientDto {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  @MaxLength(255, { message: "Name must not exceed 255 characters" })
  name!: string;

  @IsOptional()
  @IsEmail({}, { message: "Email must be a valid email" })
  @MaxLength(255, { message: "Email must not exceed 255 characters" })
  @ValidateIf((o) => o.email !== undefined && o.email !== '')
  @IsUniqueEmail({ message: "This email is already registered" })
  email?: string;

  @IsString({ message: "Phone must be a string" })
  @IsOptional()
  @MaxLength(15, { message: "Phone must not exceed 15 characters" })
  phone?: string;

  @IsString({ message: "CNPJ must be a string" })
  @IsNotEmpty({ message: "CNPJ is required" })
  @MaxLength(18, { message: "CNPJ must not exceed 18 characters (formatted: 12.345.678/0001-90)" })
  @MinLength(14, { message: "CNPJ must be at least 14 characters (digits only: 12345678000190)" })
  @IsValidCnpj({ message: "CNPJ is invalid" })
  @Transform(({ value }: { value: unknown }) => {
    // Remove all non-digit characters to store only numbers
    if (typeof value === 'string') {
      return value.replace(/[^\d]/g, '');
    }
    return value;
  })
  @UniqueCnpj({ message: "CNPJ is already registered" })
  cnpj!: string;

  @IsString({ message: "CEP must be a string" })
  @IsNotEmpty({ message: "CEP is required" })
  @MaxLength(8, { message: "CEP must not exceed 8 characters" })
  @MinLength(8, { message: "CEP must be exactly 8 characters" })
  cep!: string;

  @IsString({ message: "Address must be a string" })
  @IsNotEmpty({ message: "Address is required" })
  @MaxLength(255, { message: "Address must not exceed 255 characters" })
  address!: string;

  @IsString({ message: "Number must be a string" })
  @IsNotEmpty({ message: "Number is required" })
  @MaxLength(10, { message: "Number must not exceed 10 characters" })
  number!: string;

  @IsString({ message: "Neighborhood must be a string" })
  @IsNotEmpty({ message: "Neighborhood is required" })
  @MaxLength(255, { message: "Neighborhood must not exceed 255 characters" })
  neighborhood!: string;

  @IsString({ message: "City must be a string" })
  @IsNotEmpty({ message: "City is required" })
  @MaxLength(255, { message: "City must not exceed 255 characters" })
  city!: string;

  @IsString({ message: "State must be a string" })
  @IsNotEmpty({ message: "State is required" })
  @MaxLength(2, { message: "State must be exactly 2 characters (e.g., SP, RJ)" })
  @MinLength(2, { message: "State must be exactly 2 characters (e.g., SP, RJ)" })
  state!: string;

  @IsString({ message: "Complement must be a string" })
  @IsOptional()
  @MaxLength(255, { message: "Complement must not exceed 255 characters" })
  complement?: string;

  @IsString({ message: "Sector must be a string" })
  @IsNotEmpty({ message: "Sector is required" })
  @MaxLength(255, { message: "Sector must not exceed 255 characters" })
  sector!: string;
}