import { IsUniqueEmailUpdate } from "@/domain/validators/unique-email-update.validator";
import { IsUniquePhoneUpdate } from "@/domain/validators/unique-phone-update.validator";
import { IsEmail, IsOptional, IsString, ValidateIf } from "class-validator";
import { Transform } from "class-transformer";

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

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }
    return value;
  })
  @ValidateIf((o) => {
    const email = o.email;
    return email !== undefined && email !== null && email !== '' && email.trim() !== '';
  })
  @IsEmail({}, { message: "Email must be a valid email" })
  @IsUniqueEmailUpdate({ message: "This email is already registered by another client" })
  email?: string;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }
    return value;
  })
  @ValidateIf((o) => {
    const phone = o.phone;
    return phone !== null && phone !== undefined && phone !== '' && phone.trim() !== '';
  })
  @IsString({ message: "Phone must be a string" })
  @IsUniquePhoneUpdate({ message: "This phone is already registered by another client" })
  phone?: string;

  @IsOptional()
  @IsString({ message: "Cnpj must be a string" })
  cnpj?: string;

  @IsOptional()
  @IsString({ message: "Cep must be a string" })
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

  /**
   * Client ID for validation context (used by unique validators)
   * This field is not part of the update data, just for validation
   */
  clientId?: string;
}