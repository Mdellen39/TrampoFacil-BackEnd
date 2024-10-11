//Primeiro pode começar com o entity se formos seguir um passo, esse seria o primeiro
//classe de usuário, utilizado para manter padrão dos usuários armazenados
// isso vai ser as minha classes, minhas necessidades

import * as bcrypt from 'bcrypt';

export class UsuarioEntity{
    id: string;
    nome: string;
    idade: number;
    cidade: string;
    email: string;
    telefone: string;
    senha: string;
    doc: string;

//e essa vai ser a minha construção das minhas necessidades citadas acima

    constructor(id: string,nome: string,idade: number,cidade: string,email: string,
                    telefone: string,senha: string, doc: string){
                    const saltOrRounds = 10;
                    //aqui a gente defini quantos pulos de codigo ele vai pular, 
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cidade = cidade;
        this.email = email;
        this.telefone = telefone;
        // this.senha = senha;
        this.senha = bcrypt.hashSync(senha, saltOrRounds);
        this.doc = doc;
    }

    trocaSenha(senha){
        const saltOrRounds = 10;
        this.senha = bcrypt.hashSync(senha,saltOrRounds)
    }

    login(senha) {
        return bcrypt.compareSync(senha,this.senha);
    }

}