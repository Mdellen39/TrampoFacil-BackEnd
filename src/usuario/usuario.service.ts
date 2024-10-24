import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { USUARIO } from './usuario.entity';
import { criaUsuarioDTO } from '../dtosusuarios/criarUsuario.dto';
import { alteraUsuarioDTO } from '../dtosusuarios/alterarUsuario.dto';
import Datas from 'src/utilidades/data';


@Injectable()
export class USUARIOService {
  objDatas: Datas;
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<USUARIO>,
  ) {
    this.objDatas = new Datas();
  }

  async listar(): Promise<any[]> {
    var usuarios = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .select('usuario.ID', 'ID')
      .addSelect('usuario.foto', 'FOTO')
      .addSelect('usuario.email', 'EMAIL')
      .getRawMany();
    return usuarios;
  }

  async listarID(ID: string): Promise<any> {
    var usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .select('usuario.ID', 'ID')
      .addSelect('usuario.email', 'EMAIL')
      .addSelect('usuario.foto', 'FOTO')
      .andWhere('usuario.ID = :ID', { ID: `${ID}` })
      .getRawOne();
    return usuario;
  }

  async adicionaAssinatura(id: string, dias: number) {
    const usuario = await this.localizarID(id);

    usuario.ASSINATURA = this.objDatas.adicionarDias(usuario.ASSINATURA, dias);
    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: usuario.ID,
          message: "USUARIO alterado!"
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: "",
          message: "Houve um erro ao alterar." + error.message
        };
      });
  }

  async inserir(dados: criaUsuarioDTO): Promise<RetornoCadastroDTO> {
    let usuario = new USUARIO();
    usuario.ID = uuid();

    usuario.NOME = dados.nome;
    usuario.IDADE = dados.idade;
    usuario.CIDADE = dados.cidade;
    usuario.EMAIL = dados.email;
    usuario.TELEFONE = dados.telefone;
    // usuario.trocaSenha(dados.senha);
    usuario.DOC = dados.DOC;
    usuario.ASSINATURA = this.objDatas.dataAtual();
    usuario.FOTO = dados.FOTO;


    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: usuario.ID,
          message: "USUARIO cadastrado!"
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: "",
          message: "Houve um erro ao cadastrar." + error.message
        };
      });
  }

  async localizarID(ID: string): Promise<USUARIO> {
    return this.usuarioRepository.findOne({
      where: {
        ID,
      },
    });
  }

  async retornaAssinatura(ID: string) {
    var usuario = await this.localizarID(ID);

    var diferenca = this.objDatas.diferencaDias(usuario.ASSINATURA);

    return {
      validadeAssinatura: diferenca
    };
  }

  async localizarEmail(EMAIL: string): Promise<USUARIO> {
    return this.usuarioRepository.findOne({
      where: {
        EMAIL,
      },
    });
  }

  async Login(email: string, senha: string) {
    const possivelUsuario = await this.localizarEmail(email);

    return {
      usuario: possivelUsuario ? (possivelUsuario.login(senha) ? possivelUsuario : null) : null,
      status: possivelUsuario ? possivelUsuario.login(senha) : false
    };
  }

  async validaEmail(emailNovo: string) {
    const possivelUsuario = await this.localizarEmail(emailNovo);

    return (possivelUsuario == null);
  }

  async remover(id: string): Promise<RetornoObjDTO> {
    const usuario = await this.localizarID(id);

    return this.usuarioRepository.remove(usuario)
      .then((result) => {
        return <RetornoObjDTO>{
          return: usuario,
          message: "USUARIO excluido!"
        };
      })
      .catch((error) => {
        return <RetornoObjDTO>{
          return: usuario,
          message: "Houve um erro ao excluir." + error.message
        };
      });
  }

  async alterar(id: string, dados: alteraUsuarioDTO): Promise<RetornoCadastroDTO> {
    const usuario = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
        if (chave === 'ID') {
          return;
        } else {
          usuario[chave] = valor;
        }
      }
    );

    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: usuario.ID,
          message: "USUARIO alterado!"
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: "",
          message: "Houve um erro ao alterar." + error.message
        };
      });
  }
}








// import { Inject, Injectable } from "@nestjs/common";
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { USUARIO } from "./usuario.entity";
// import { alteraUsuarioDTO } from "../dtosusuarios/alterarUsuario.dto";
// import { criaUsuarioDTO } from "src/dtosusuarios/criarUsuario.dto";
// import Datas from "src/utilidades/data";

// @Injectable()
// // export class UsuarioService {
// //   constructor(
// //     @Inject('USUARIO_REPOSITORY')
// //     private usuarioRepository: Repository<USUARIO>,
// //   ) {}

// //   alterar(id: string, dados: alteraUsuarioDTO): any {
// //       throw new Error("Method not implemented.");
// //   }
// //   remover(id: string): any {
// //       throw new Error("Method not implemented.");
// //   }
// //   localizarID(id: string): USUARIO | PromiseLike<USUARIO> {
// //       throw new Error("Method not implemented.");
// //   }
// //   inserir(dados: criaUsuarioDTO): any {
// //       throw new Error("Method not implemented.");
// //   }
// //   listar(): USUARIO[] | PromiseLike<USUARIO[]> {
// //       throw new Error("Method not implemented.");
// //   }

// @Injectable()
// export class USUARIOService {
//   objDatas: Datas;
//   constructor(
//     @Inject('USUARIO_REPOSITORY')
//     private usuarioRepository: Repository<USUARIO>,
//   ) {
//     this.objDatas = new Datas();
//   }
  

//   // Adcionar usuário no banco de dados
//   async AdicionarUsuario(usuario: USUARIO): Promise<USUARIO> {
//     return await this.usuarioRepository.save(usuario);
//   }

//   // Função para pesquisar usuário pelo email
//   async pesquisaEmail(email: string): Promise<USUARIO | undefined> {
//     return await this.usuarioRepository.findOne({ where: { email } });
//   }

//   // Função para pesquisar usuário pelo ID
//   async pesquisaId(id: string): Promise<USUARIO> {
//     const possivelUsuario = await this.usuarioRepository.findOne({ where: { id } });
//     if (!possivelUsuario) {
//       throw new Error('Usuário não encontrado');
//     }
//     return possivelUsuario;
//   }

//   // Função para alterar os dados de um usuário existente
//   async alteraUsuario(id: string, dadosNovos: alteraUsuarioDTO): Promise<USUARIO> {
//     const usuario = await this.pesquisaId(id);

//     // Atualizar apenas os campos permitidos, exceto o ID
//     Object.entries(dadosNovos).forEach(([chave, valor]) => {
//       if (chave === 'id') return;
//       if (chave === 'senha') {
//         usuario.trocaSenha(valor);
//       } else {
//         (usuario as any)[chave] = valor;
//       }
//     });

//     return await this.usuarioRepository.save(usuario);
//   }

//   // Validação para verificar se o email já existe
//   async validaEmail(emailNovo: string): Promise<boolean> {
//     const possivelUsuario = await this.pesquisaEmail(emailNovo);
//     return possivelUsuario === undefined;
//   }

//   // Função para realizar o login
//   async Login(email: string, senha: string): Promise<{ usuario: USUARIO | null, status: boolean }> {
//     const possivelUsuario = await this.pesquisaEmail(email);

//     if (possivelUsuario) {
//       const isSenhaCorreta = possivelUsuario.login(senha);
//       return {
//         usuario: isSenhaCorreta ? possivelUsuario : null,
//         status: isSenhaCorreta,
//       };
//     } else {
//       return {
//         usuario: null,
//         status: false,
//       };
//     }
//   }

//   // Função para remover um usuário
//   async removeUsuario(id: string): Promise<USUARIO> {
//     const usuario = await this.pesquisaId(id);
//     await this.usuarioRepository.delete(id);
//     return usuario;
//   }

//   // Função para retornar todos os usuários
//   async getUsuarios(): Promise<USUARIO[]> {
//     return await this.usuarioRepository.find();
//   }
// }



















































// import { Injectable } from "@nestjs/common";
// import { USUARIO } from "./usuario.entity";
// import { alteraUsuarioDTO } from "../dtosusuarios/alterarUsuario.dto";


// @Injectable()
// export class UsuariosArmazenados{
//     //Criação de vetor para armazenar os usuários (apenas em memoria, quando reiniciar a API perde tudo)
//     #usuarios: USUARIO[] = [];  

//     //funçaço responsável por guardar o usuário no vetor
//     AdicionarUsuario(usuario: USUARIO){
//         this.#usuarios.push(usuario);
//     }

//     //função resposável por pesquisar usuários que tenham o email especificado 
//     pesquisaEmail(email:string){

//         //função find procura no vetor os dados com base no que foi especificado na função de parada( usuario.email = email)
//         const possivelUsuario = this.#usuarios.find(
//             usuario => usuario.email == email
//         )
//         return possivelUsuario;
//     }    

//     //função responsável por pesquisar usuário que tenham o ID especificado
//     pesquisaId(id:string){
//         const possivelUsuario = this.#usuarios.find(
//             usuarioSalvo => usuarioSalvo.id === id
//         );

//         if(!possivelUsuario){
//             throw new Error('Usuario não encontrado');//cria um erro quando o usuário não é encontrado
//         }

//         return possivelUsuario
//     }

//     //função responsável por alterar o usuário
//     alteraUsuario(id:string,dadosNovos: alteraUsuarioDTO){
//         //pesquisa o usuário que vai ser alterado
//         const usuario = this.pesquisaId(id);

//         //aqui os dados que são recebidos no JSon são convertidos para uma tabela de chave e valor, para isolar os dados recebidos
//         Object.entries(dadosNovos).forEach(
//             ([chave,valor]) => {
//                 //aqui é validado se o campo a ser alterado vai ser o ID, se for ele ignora, pois não se pode alterar o ID
//                 if(chave === 'id'){
//                     return
//                 }
//                 else if(chave === 'senha'){
//                     usuario.trocaSenha(valor)
//                 } else { 

//                 //caso não seja nenhum campo especial, é feito só a alteração direta do valor do campo com base no valor passado 
//                 usuario[chave] = valor;
//             }
//             }
//         )
//         return usuario;
        
//     }
//     //função para validar se o email passado ja existe em outro usuário, é usada em geral para o email unico validator
//     validaEmail(emailNovo: string){
//         const possivelUsuario = this.pesquisaEmail(emailNovo)
        
//         return (possivelUsuario === undefined)
//     }

//     //função responsável por fazer a validação de login
//     Login(email:string ,senha:string){
//         //primeiro é pesquisado o usuário por meio do email
//         const possivelUsuario = this.pesquisaEmail(email)



//         //caso encontre o usuário é validada então a senha, caso contrário ja retorna erro de login
//         if (possivelUsuario){
//             return {
//                 //aqui é validada a senha, caso a senha esteja correta, é retornado os dados do usuário e também o status (true para correto, false para incorreto)
//                 usuario: possivelUsuario.login(senha)?possivelUsuario:null,
//                 status: possivelUsuario.login(senha)
//             };
//         }else{
//             return {
//                 usuario: null,
//                 status: false
//             };
//         }
//     }

//     async removeUsuario(id: string) {
//         const usuario = this.pesquisaId(id);

//         this.#usuarios = this.#usuarios.filter(
//             usuarioSalvo => usuarioSalvo.id !== id
//         )

//         return usuario;
//     }
    
//     //função para retornar todos os usuarios
//     get Usuarios(){        
//         return this.#usuarios;
//     }
// }












