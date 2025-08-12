import clientService from "@/infrastructure/services/client.service";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'UniqueCnpj', async: true })
export class UniqueCnpjValidator implements ValidatorConstraintInterface {

    async validate(cnpj: string): Promise<boolean> {
        try {
            const client = await clientService.findByCnpj(cnpj);
            return !client;
        } catch (error) {
            console.error('❌ Error in CNPJ validation:', error);
            return true;
        }
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