import { IsNotEmpty, IsString } from "class-validator";


export class CriaGeneroDTO {
    @IsString()
    @IsNotEmpty({
        message: "Nome nao pode ser vazio"
    })
    NOME: string;

    @IsString()
    @IsNotEmpty({
        message: "Descricao nao pode ser vazio"
    })
    DESCRICAO: string;


}