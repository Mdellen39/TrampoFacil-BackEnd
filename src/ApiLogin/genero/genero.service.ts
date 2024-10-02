import { Inject, Injectable } from "@nestjs/common";
import { GENERO } from "./genero.entity";
import { Repository } from 'typeorm';
import { RetornoUsuarioDTO } from "../Dtosusuarios/retornousuario.dto";
import { CriaGeneroDTO } from "./dto/criaGenero.dto";
import { RetornoCadastroDTO, RetornoObjDTO } from "./dto/retorno.dto";
import { AlteraGeneroDTO } from "./dto/atualizaGenero.dto";
import { v4 vs uuid} from "@nestjs/common";

@Injectable()
export class GeneroService {
    constructor(
        @Inject('GENERO_REPOSITORY')
        private generoRepository: Repository<GENERO>,
    ) {}

    async listar (): Promise<GENERO[]> {
        return this.generoRepository.find();
    }

    async inserir(dados: CriaGeneroDTO): Promise<RetornoCadastroDTO> {
        let genero = new GENERO();
        genero.ID = uuid();
        genero.NOME = dados.NOME;
        genero.DESCRICAO = dados.DESCRICAO;

        return this.generoRepository.save(genero)
            .then((result) => {
                return <RetornoCadastroDTO>{
                    id: genero.ID,
                    message: "Genero Cadastrado!!"
                };
            })
            .catch((error) => {
                return <RetornoCadastroDTO>{
                    id: "",
                    message: "Houve um erro ao cadastrar." + error.message
                };
            })


    }

    async alterar(id: string, dados: AlteraGeneroDTO): Promise<RetornoCadastroDTO> {
        const genero = await this.localizarID(id);

        Object.entries(dados).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return;
                }
                genero[chave] = valor;
            }
        )

        return this.generoRepository.save(genero)
            .then((result) => {
                return <RetornoCadastroDTO>{
                    id: genero.ID,
                    message: "Genero Alterado!"
                };
            })

            .catch((error) => {
                return <RetornoCadastroDTO>{
                    id: "",
                    message: "Houve um erro ao alterar." + error.message
                };
            })

    }

    async remover(id: string): Promise <RetornoObjDTO> {
        const genero = await this.localizarID(id);

        return this.generoRepository.remove(genero)
            .then((result) => {
                return <RetornoObjDTO>{
                    return: genero,
                    message: "Genero Excluido!"
                };
            })
            .catch((error) => {
                return <RetornoObjDTO>{
                    return: genero,
                    message: "Houve um erro ao excluir." + error.message
                }
            });
    }

    localizarID (ID: string): Promise<GENERO> {
        return this.generoRepository.findOne ({
            where: {
                ID,
            },
        });
    }

    LocalizarNome (NOME: string): Promise<GENERO> {
        return this.generoRepository.findOne({
            where: {
                NOME,
            },
        });
    }




}