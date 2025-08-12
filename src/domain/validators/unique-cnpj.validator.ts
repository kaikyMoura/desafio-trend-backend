import clientService from "@/infrastructure/services/client.service";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'UniqueCnpj', async: true })
export class UniqueCnpjValidator implements ValidatorConstraintInterface {

    async validate(cnpj: string): Promise<boolean> {
        try {
            console.log('🔍 Validating CNPJ uniqueness:', {
                cnpj,
                type: typeof cnpj,
                length: cnpj?.length,
                value: cnpj
            });
            
            const exists = await clientService.existsByCnpj(cnpj);
            const isUnique = !exists;
            
            console.log('📋 CNPJ validation result:', { cnpj, exists, isUnique });
            return isUnique;
        } catch (error) {
            console.error('❌ Error in CNPJ validation:', error);
            return true;
        }
    }

    defaultMessage(): string {
        return 'CNPJ already exists in the system';
    }
}

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