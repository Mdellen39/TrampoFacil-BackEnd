import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class AlteraGeneroDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty({
        message: "Nome nao pode ser vazio"
    })
    NOME: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({
        message: "Descricao nao pode ser vazio"
    })
    DESCRICAO: string;

}