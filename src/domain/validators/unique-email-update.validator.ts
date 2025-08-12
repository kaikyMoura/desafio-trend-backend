import clientService from "@/infrastructure/services/client.service";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ILoggerService } from "../interfaces/logger.service.interface";
import { LoggerService } from "@/infrastructure/logger/logger.service";

/**
 * IsUniqueEmailUpdateConstraint is a class that validates if an email is unique during updates.
 * @description This class validates if an email is unique, but allows the current email of the client being updated.
 */
@ValidatorConstraint({ name: 'IsUniqueEmailUpdate', async: true })
export class IsUniqueEmailUpdateConstraint implements ValidatorConstraintInterface {
  private readonly name = 'IsUniqueEmailUpdateConstraint';

  private readonly logger: ILoggerService = new LoggerService();
  
  /**
   * validate is a method that validates if an email is unique during updates.
   * @description This method validates if an email is unique, but allows the current email of the client being updated.
   * @param email - The email to validate.
   * @param args - Validation arguments containing the object and client ID.
   * @returns True if the email is unique, not provided, or is the current email, false otherwise.
   */
  async validate(email: string | undefined, validationArguments?: ValidationArguments): Promise<boolean> {
    try {
      if (!email || email.trim() === '') {
        this.logger.info('📧 Email not provided, skipping validation', `${this.name}.validate`, { email });
        return true;
      }

      // Get the client ID from the validation context
      const clientId = (validationArguments?.object as { clientId?: string; id?: string })?.clientId || (validationArguments?.object as { clientId?: string; id?: string })?.id;
      
      if (!clientId) {
        this.logger.warn('⚠️ No client ID provided for email update validation', `${this.name}.validate`, { email, clientId });
        // If no client ID, fall back to regular uniqueness check
        const exists = await clientService.existsByEmail(email);
        return !exists;
      }

      this.logger.info('🔍 Validating email uniqueness for update:', `${this.name}.validate`, { email, clientId });
      
      // Check if email exists for any other client
      const existingClient = await clientService.findByEmail(email);
      
      if (!existingClient) {
        this.logger.info('✅ Email is unique (not found)', `${this.name}.validate`, { email, clientId });
        return true;
      }

      // If email exists, check if it's the same client being updated
      if (existingClient.id === clientId) {
        this.logger.info('✅ Email belongs to the same client (update allowed)', `${this.name}.validate`, { email, clientId });
        return true;
      }

      this.logger.info('❌ Email already exists for another client', `${this.name}.validate`, { email, clientId, existingClientId: existingClient.id });
      return false;
      
    } catch (error) {
      this.logger.error('❌ Error in email update validation:', `${this.name}.validate`, { email, error });
      return true;
    }
  }

  /**
   * defaultMessage is a method that returns the default message.
   * @description This method returns the default message.
   * @returns The default message.
   */
  defaultMessage(): string {
    return 'This email is already registered by another client.';
  }
}

/**
 * Validates that an email is unique during updates, allowing the current client's email.
 * @param validationOptions - Validation options.
 * @returns A function that validates the email for updates.
 * @example
 * ```typescript
 * class UpdateClientInput {
 *   @IsUniqueEmailUpdate({ message: 'This email is already registered by another client.' })
 *   email?: string; // Optional email for update
 * }
 * ```
 */
export function IsUniqueEmailUpdate(validationOptions: ValidationOptions = {}) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniqueEmailUpdateConstraint,
    });
  };
}
