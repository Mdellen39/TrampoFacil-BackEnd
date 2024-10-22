import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import * as zxcvbn from 'zxcvbn';

@Injectable()
@ValidatorConstraint({ async: true })
export class StrongPassValidator implements ValidatorConstraintInterface {
    
    private readonly MIN_SCORE = 3; // Aqui define a pontuação mínima

    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        if (!value) return false; // Mostrar (Sua seha vazia é invalida) 

        const result = zxcvbn(value);
        return result.score >= this.MIN_SCORE; // Retorna true se a senha for forte
    }    
}

/**
  Decorador para validar se a senha é forte.
 
  @param opcaoValidacao 
  
 */
export const SenhaForte = (opcaoValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcaoValidacao,
            constraints: [],
            validator: StrongPassValidator,
        });
    }
}







