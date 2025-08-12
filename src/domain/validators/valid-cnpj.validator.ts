import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

/**
 * ValidCnpjValidator is a class that validates if a CNPJ is valid.
 * @description This class validates if a CNPJ is valid.
 */
@ValidatorConstraint({ name: 'IsValidCnpj', async: true })
export class ValidCnpjValidator implements ValidatorConstraintInterface {
    validate(cnpj: string): boolean {
        if (!cnpj) return false;
        if (typeof cnpj !== 'string') return false;

        cnpj = cnpj.replace(/[^\d]+/g, ""); // Remove all non-digit characters

        if (cnpj.length !== 14) return false;
      
        // Remove CNPJs known invalid
        if (/^(\d)\1+$/.test(cnpj)) return false;
      
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
        const firstCheckDigit = calculateDigit(base, [5,4,3,2,9,8,7,6,5,4,3,2]);

        // Validate the second check digit
        const secondCheckDigit = calculateDigit(base + firstCheckDigit, [6,5,4,3,2,9,8,7,6,5,4,3,2]);
      
        return cnpj === base + firstCheckDigit.toString() + secondCheckDigit.toString();
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