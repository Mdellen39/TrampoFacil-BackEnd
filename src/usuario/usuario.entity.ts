
import * as bcrypt from 'bcrypt';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class USUARIO {
    
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column({ length: 255 })
    NOME: string;

    @Column()
    IDADE: number;

    @Column({ length: 255 })
    CIDADE: string;

    @Column({ length: 255 })
    EMAIL: string;

    @Column({ length: 15 })
    TELEFONE: string;

    @Column()
    SENHA: string;

    @Column({ length: 14 })
    DOC: string;
    ASSINATURA: Date;
    FOTO: any;




    // conforme estava nos codigos anteriores, metodo para trocar a senha
    trocaSenha(novaSenha: string) {
        // const saltOrRounds = 10;
        // this.senha = bcrypt.hashSync(novaSenha, saltOrRounds);
        this.SENHA = novaSenha;
    }

    // conforme estava nos codigos anteriores, metodo de login para trocar a senha
    login(senha: string) {
        // return bcrypt.compareSync(senha, this.senha);
        return senha == this.SENHA
    }
}
































//Primeiro pode começar com o entity se formos seguir um passo, esse seria o primeiro
//classe de usuário, utilizado para manter padrão dos usuários armazenados
// isso vai ser as minha classes, minhas necessidades



// export class UsuarioEntity{
//     id: string;
//     nome: string;
//     idade: number;
//     cidade: string;
//     email: string;
//     telefone: string;
//     senha: string;
//     doc: string;

// //e essa vai ser a minha construção das minhas necessidades citadas acima

//     constructor(id: string,nome: string,idade: number,cidade: string,email: string,
//                     telefone: string,senha: string, doc: string){
//                     const saltOrRounds = 10;
//                     //aqui a gente defini quantos pulos de codigo ele vai pular,
//         this.id = id;
//         this.nome = nome;
//         this.idade = idade;
//         this.cidade = cidade;
//         this.email = email;
//         this.telefone = telefone;
//         // this.senha = senha;
//         this.senha = bcrypt.hashSync(senha, saltOrRounds);
//         this.doc = doc;
//     }

//     trocaSenha(senha){
//         const saltOrRounds = 10;
//         this.senha = bcrypt.hashSync(senha,saltOrRounds)
//     }

//     login(senha) {
//         return bcrypt.compareSync(senha,this.senha);
//     }

// }








// import { FILME } from "src/filmes/filme.entity";
// import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

// @Entity()
// export class PESSOA {
//     @PrimaryColumn()
//     ID:string;

//     @Column({length: 255})
//     NOME: string;

//     @Column()
//     NASCIMENTO: Date;

//     @Column({length: 255})
//     PAIS: string;

//     @ManyToMany(
//       () => FILME,
//       filme => filme.atores, //optional
//       {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
//       @JoinTable({
//         name: 'filme_pessoa',
//         joinColumn: {
//           name: 'IDPESSOA',
//           referencedColumnName: 'ID',
//         },
//         inverseJoinColumn: {
//           name: 'IDFILME',
//           referencedColumnName: 'ID',
//         },
//       })
//     filmes?: FILME[];
// }


