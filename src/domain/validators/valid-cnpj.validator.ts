import { LoggerService } from "@/infrastructure/logger/logger.service";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ILoggerService } from "../interfaces/logger.service.interface";

/**
 * ValidCnpjValidator is a class that validates if a CNPJ is valid.
 * @description This class validates if a CNPJ is valid.
 */
@ValidatorConstraint({ name: 'IsValidCnpj', async: true })
export class ValidCnpjValidator implements ValidatorConstraintInterface {

    private readonly name = 'ValidCnpjValidator';

    private readonly logger: ILoggerService = new LoggerService();
    /**
     * Validates if a CNPJ is valid.
     * @param cnpj - The CNPJ to validate.
     * @returns True if the CNPJ is valid, false otherwise.
     */
    validate(cnpj: string): boolean {
        try {
            if (!cnpj) {
                this.logger.info('❌ CNPJ not provided, skipping validation', `${this.name}.validate`, { cnpj });
                return false;
            }
            if (typeof cnpj !== 'string') {
                this.logger.info('❌ CNPJ is not a string, skipping validation', `${this.name}.validate`, { cnpj });
                return false;
            }

            cnpj = cnpj.replace(/[^\d]+/g, ""); // Remove all non-digit characters

            if (cnpj.length !== 14) {
                this.logger.info('❌ CNPJ length is not 14, skipping validation', `${this.name}.validate`, { cnpj });
                return false;
            }

            // Remove CNPJs known invalid
            if (/^(\d)\1+$/.test(cnpj)) {
                this.logger.info('❌ CNPJ is known invalid, skipping validation', `${this.name}.validate`, { cnpj });
                return false;
            }

            // Validate the check digits
            const calculateDigit = (base: string, weights: number[]) => {
                let sum = 0;
                for (let i = 0; i < weights.length; i++) {
                    sum += parseInt(base.charAt(i)) * (weights[i] ?? 0);
                }
                const remainder = sum % 11;
                return remainder < 2 ? 0 : 11 - remainder;
            };

            // Get the base for the check digits
            const base = cnpj.substring(0, 12);

            // Validate the first check digit
            const firstCheckDigit = calculateDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

            // Validate the second check digit
            const secondCheckDigit = calculateDigit(base + firstCheckDigit, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

            return cnpj === base + firstCheckDigit.toString() + secondCheckDigit.toString();
        } catch (error) {
            this.logger.error('❌ Error in CNPJ validation:', `${this.name}.validate`, { cnpj, error });
            return false;
        }
    }

    /**
     * Returns the default message for the CNPJ validation.
     * @returns The default message for the CNPJ validation.
     */
    defaultMessage(): string {
        return 'CNPJ is not valid';
    }
}

/**
 * Validates that a CNPJ is valid.
 * @param validationOptions - Validation options.
 * @returns A function that validates the CNPJ.
 */
export function IsValidCnpj(validationOptions: ValidationOptions = {}) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: ValidCnpjValidator,
        });
    };
}