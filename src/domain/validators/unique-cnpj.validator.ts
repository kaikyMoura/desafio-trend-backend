import clientService from "@/infrastructure/services/client.service";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ILoggerService } from "../interfaces/logger.service.interface";
import { LoggerService } from "@/infrastructure/logger/logger.service";

/**
 * Validates if a CNPJ is unique.
 * @description This validator is used to validate if a CNPJ is unique.
 */
@ValidatorConstraint({ name: 'UniqueCnpj', async: true })
export class UniqueCnpjValidator implements ValidatorConstraintInterface {

    private readonly name = 'UniqueCnpjValidator';
    
    private readonly logger: ILoggerService = new LoggerService();

    /**
     * Validates if a CNPJ is unique.
     * @param cnpj - The CNPJ to validate.
     * @returns True if the CNPJ is unique, false otherwise.
     */
    async validate(cnpj: string): Promise<boolean> {
        try {
            this.logger.info('🔍 Validating CNPJ uniqueness:', `${this.name}.validate`, {
                cnpj,
                type: typeof cnpj,
                length: cnpj?.length,
                value: cnpj
            });
            
            const exists = await clientService.existsByCnpj(cnpj);
            const isUnique = !exists;
            
            this.logger.info('📋 CNPJ validation result:', `${this.name}.validate`, { cnpj, exists, isUnique });
            return isUnique;
        } catch (error) {
            this.logger.error('❌ Error in CNPJ validation:', `${this.name}.validate`, { cnpj, error });
            return true;
        }
    }

    /**
     * Returns the default message for the CNPJ validation.
     * @returns The default message for the CNPJ validation.
     */
    defaultMessage(): string {
        return 'CNPJ already exists in the system';
    }
}

/**
 * Validates if a CNPJ is unique.
 * @param validationOptions - The validation options.
 * @returns The validation options.
 */
export function UniqueCnpj(validationOptions: ValidationOptions = {}) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: UniqueCnpjValidator,
        });
    };
}