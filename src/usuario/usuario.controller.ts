import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { USUARIOService } from "./usuario.service";
import { USUARIO } from "./usuario.entity";
import { criaUsuarioDTO } from "../dtosusuarios/criarUsuario.dto";
import { alteraUsuarioDTO } from "../dtosusuarios/alterarUsuario.dto";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";

@ApiTags('usuario')
@Controller('/usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: USUARIOService) {} // Correção aqui

    @Get('')
    async listar(): Promise<USUARIO[]> {
        return this.usuarioService.listar();
    }

    @Post('')
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async criaUsuario(@Body() dados: criaUsuarioDTO): Promise<RetornoCadastroDTO> {
        return this.usuarioService.inserir(dados);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Usuário alterado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos ou usuário não encontrado.' })
    async alterarUsuario(@Body() dados: alteraUsuarioDTO, @Param('id') id: string): Promise<RetornoCadastroDTO> {
        return this.usuarioService.alterar(id, dados);
    }

    @Get(':id') // Alterado para simplificar
    @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async listarPorID(@Param('id') id: string): Promise<USUARIO> {
        return this.usuarioService.localizarID(id);
    }

    @Delete(':id') // Alterado para simplificar
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async removeUsuario(@Param('id') id: string): Promise<RetornoObjDTO> {
        return this.usuarioService.remover(id);
    }
}















