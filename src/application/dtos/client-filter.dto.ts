import { IsValidCnpj } from "@/domain/validators/valid-cnpj.validator";
import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsString } from "class-validator";

/**
 * ClientFilterDto is a DTO that is used to filter clients.
 * @property name - The name of the client.
 * @property email - The email of the client.
 * @property phone - The phone of the client.
 * @property cnpj - The cnpj of the client.
 * @property sector - The sector of the client.
 * @property cep - The CEP of the client.
 * @property address - The address of the client.
 * @description This DTO is used to filter clients by various fields.
 * @example
 * {
 *  cnpj: "1234567890",
 *  sector: "Technology",
 *  cep: "12345678"
 * }
 */
export class ClientFilterDto {
    @Transform(({ value }) => value?.toString())
    @IsString({ message: "Name must be a string" })
    @IsOptional({ message: "Name is optional" })
    name?: string;

    @Transform(({ value }) => value?.toString())
    @IsEmail({}, { message: "Email must be a valid email" })
    @IsOptional({ message: "Email is optional" })
    email?: string;

    @Transform(({ value }) => value?.toString())
    @IsString({ message: "Phone must be a string" })
    @IsOptional({ message: "Phone is optional" })
    phone?: string;

    @Transform(({ value }) => value?.toString())
    @IsString({ message: "Cnpj must be a string" })
    @IsOptional({ message: "Cnpj is optional" })
    @IsValidCnpj({ message: "Cnpj must be a valid CNPJ" })
    cnpj?: string;

    @Transform(({ value }) => value?.toString())
    @IsString({ message: "Sector must be a string" })
    @IsOptional({ message: "Sector is optional" })
    sector?: string;

    @Transform(({ value }) => value?.toString())
    @IsString({ message: "CEP must be a string" })
    @IsOptional({ message: "CEP is optional" })
    cep?: string;

    @Transform(({ value }) => value?.toString())
    @IsString({ message: "Address must be a string" })
    @IsOptional({ message: "Address is optional" })
    address?: string;
}
