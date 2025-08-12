import clientService from "@/infrastructure/services/client.service";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ILoggerService } from "../interfaces/logger.service.interface";
import { LoggerService } from "@/infrastructure/logger/logger.service";

/**
 * IsUniqueEmailConstraint is a class that validates if an email is unique.
 * @description This class validates if an email is unique.
 */
@ValidatorConstraint({ name: 'IsUniqueEmail', async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  private readonly name = 'IsUniqueEmailConstraint';

  private readonly logger: ILoggerService = new LoggerService();
  
  /**
   * validate is a method that validates if an email is unique.
   * @description This method validates if an email is unique.
   * @param email - The email to validate.
   * @returns True if the email is unique or not provided, false otherwise.
   */
  async validate(email: string | undefined): Promise<boolean> {
    try {
      if (!email || email.trim() === '') {
        this.logger.info('📧 Email not provided, skipping validation', `${this.name}.validate`, { email });
        return true;
      }

      this.logger.info('🔍 Validating email uniqueness:', `${this.name}.validate`, { email });
      const exists = await clientService.existsByEmail(email);
      const isUnique = !exists;
      
      this.logger.info('📧 Email validation result:', `${this.name}.validate`, {
        email,
        isUnique,
        exists: !!exists,
      });
      
      return isUnique;
    } catch (error) {
      this.logger.error('❌ Error in email validation:', `${this.name}.validate`, { email, error });
      return true;
    }
  }

  /**
   * defaultMessage is a method that returns the default message.
   * @description This method returns the default message.
   * @returns The default message.
   */
  defaultMessage(): string {
    return 'This email is already registered.';
  }
}

/**
 * Validates that an email is unique when provided.
 * @param validationOptions - Validation options.
 * @returns A function that validates the email.
 * @example
 * ```typescript
 * class CreateClientInput {
 *   @IsUniqueEmail({ message: 'This email is already registered.' })
 *   email?: string; // Optional email
 * }
 * ```
 */
export function IsUniqueEmail(validationOptions: ValidationOptions = {}) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniqueEmailConstraint,
    });
  };
}
