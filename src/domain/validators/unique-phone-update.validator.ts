import clientService from '@/infrastructure/services/client.service';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { ILoggerService } from '../interfaces/logger.service.interface';
import { LoggerService } from '@/infrastructure/logger/logger.service';

/**
 * Validates if a phone is unique during updates.
 * @description This validator is used to validate if a phone is unique, but allows the current phone of the client being updated.
 */
@ValidatorConstraint({ name: 'IsUniquePhoneUpdate', async: true })
export class IsUniquePhoneUpdateConstraint implements ValidatorConstraintInterface {
    private readonly name = 'IsUniquePhoneUpdateConstraint';
    
    private readonly logger: ILoggerService = new LoggerService();
    
    /**
     * Validates if a phone is unique during updates.
     * @param phone - The phone to validate.
     * @param validationArguments - Validation arguments containing the object and client ID.
     * @returns True if the phone is unique, not provided, or is the current phone, false otherwise.
     */
    async validate(phone: string | undefined, validationArguments?: ValidationArguments): Promise<boolean> {
        try {
            if (!phone || phone.trim() === '') {
                this.logger.info('📱 Phone not provided, skipping validation', `${this.name}.validate`, { phone });
                return true;
            }

            // Get the client ID from the validation context
            const clientId = (validationArguments?.object as { clientId?: string; id?: string })?.clientId || (validationArguments?.object as { clientId?: string; id?: string })?.id;
            
            if (!clientId) {
                this.logger.warn('⚠️ No client ID provided for phone update validation', `${this.name}.validate`, { phone, clientId });
                // If no client ID, fall back to regular uniqueness check
                const exists = await clientService.existsByPhone(phone);
                return !exists;
            }

            this.logger.info('🔍 Validating phone uniqueness for update:', `${this.name}.validate`, { phone, clientId });
            
            // Check if phone exists for any other client
            const existingClient = await clientService.findByPhone(phone);
            
            if (!existingClient) {
                this.logger.info('✅ Phone is unique (not found)', `${this.name}.validate`, { phone, clientId });
                return true;
            }

            // If phone exists, check if it's the same client being updated
            if (existingClient.id === clientId) {
                this.logger.info('✅ Phone belongs to the same client (update allowed)', `${this.name}.validate`, { phone, clientId });
                return true;
            }

            this.logger.info('❌ Phone already exists for another client', `${this.name}.validate`, { phone, clientId, existingClientId: existingClient.id });
            return false;
            
        } catch (error) {
            this.logger.error('❌ Error in phone update validation:', `${this.name}.validate`, { phone, error });
            return true;
        }
    }

    /**
     * Returns the default message for the phone validation.
     * @returns The default message for the phone validation.
     */
    defaultMessage(): string {
        return 'Phone must be unique';
    }
}

/**
 * Validates if a phone is unique during updates, allowing the current client's phone.
 * @param validationOptions - The validation options.
 * @returns The validation decorator.
 */
export function IsUniquePhoneUpdate(validationOptions: ValidationOptions = {}) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: IsUniquePhoneUpdateConstraint,
        });
    };
}
