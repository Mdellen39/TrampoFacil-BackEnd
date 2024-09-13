//DTO responsável por receber dados de login
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados

import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../Validacaoemail.validador.ts/email-unico.validator";
// esse email Unico, serve para receber o email e a senha do usuario, que esta dentro do email unico validator 

export class loginUsuarioDTO{
    @IsEmail(undefined, {message: "email inválido"})
    email: string;

    @MinLength(6, {message: "senha deve ter no minimo 6 digitos"})
    senha:string;
}