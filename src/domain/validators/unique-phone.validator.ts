import clientService from '@/infrastructure/services/client.service';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ILoggerService } from '../interfaces/logger.service.interface';
import { LoggerService } from '@/infrastructure/logger/logger.service';

/**
 * Validates if a phone is unique.
 * @description This validator is used to validate if a phone is unique.
 */
@ValidatorConstraint({ name: 'IsUniquePhone', async: true })
export class IsUniquePhoneConstraint implements ValidatorConstraintInterface {
    private readonly name = 'IsUniquePhoneConstraint';
    
    private readonly logger: ILoggerService = new LoggerService();
    /**
     * Validates if a phone is unique.
     * @param phone - The phone to validate.
     * @returns True if the phone is unique, false otherwise.
     */
    async validate(phone: string | undefined): Promise<boolean> {
        try {
        if (!phone || phone.trim() === '') {
            this.logger.info('📱 Phone not provided, skipping validation', `${this.name}.validate`, { phone });
            return true;
        }
        const exists = await clientService.existsByPhone(phone);
        const isUnique = !exists;
        this.logger.info('📱 Phone validation result:', `${this.name}.validate`, {
            phone,
            isUnique,
                exists: !!exists,
            });
            return isUnique;
        } catch (error) {
            this.logger.error('❌ Error in phone validation:', `${this.name}.validate`, { phone, error });
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
 * Validates if a phone is unique.
 * @param validationOptions - The validation options.
 * @returns The validation options.
 */
export function IsUniquePhone(validationOptions: ValidationOptions = {}) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: IsUniquePhoneConstraint,
        });
    };
}