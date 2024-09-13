//classe responsável por definir padrão para alteração de usuários
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from '../Validacaoemail.validador.ts/email-unico.validator'
import { ApiPropertyOptional } from "@nestjs/swagger";
import { SenhaForte } from "../Validacaoemail.validador.ts/strongpass.validador";

export class alteraUsuarioDTO{

    //decorators de tipo e validação, são responsáveis por darem padrão e validar informações importantes nos DTOs
    //podem ser prédefinidos ou podem ser criados de forma customizada(exemplo email unico)
    // aqui nao é passado o ID, pois o ID nao é para aparecer pra o cliente. 
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @EmailUnico({message: "Email repetido"})
    @IsEmail(undefined, {message: "email inválido"})
    @IsOptional()
    email: string;

    @MinLength(6, {message: "senha deve ter no minimo 6 digitos"})
    @IsOptional()
    @ApiPropertyOptional({
        example: "senha123",
        description: "Senha do usuário, deve ter pelo menos 6 digitos"
    })
    @SenhaForte({message:"Senha deve ter complexidade maior, Esta muito fraca"})
    senha:string;
    
    @IsNumber()
    @IsOptional()
    idade: number;

    @IsString()
    @IsOptional()
    cidade: string;

    @IsString()
    @IsOptional()
    telefone: string;

    @IsString()
    @IsOptional()
    doc:string;
}