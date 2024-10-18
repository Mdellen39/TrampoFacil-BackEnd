





import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { usuarioProviders } from './usuario.providers';
import { USUARIOService } from './usuario.service';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [DatabaseModule],  // Importando o módulo do banco de dados
  controllers: [UsuarioController],  // Definindo o controller do usuário
  providers: [
    ...usuarioProviders,  // Injetando os providers do usuário
    USUARIOService,  // Injetando o serviço do usuário
  ],
})
export class UsuarioModule {}



// // //classe de modulo do usuário, responsável por administrar todo o modulo de usuário, incluindo controller, DM, e validators, 
// // //tudo o que o modulo de usuário contem, é adinistrado pela classe de módulo

// import { Module } from '@nestjs/common';
// import { UsuarioController } from './usuario.controller';
// import { UsuarioService } from './usuario.service'; // Verifique o caminho correto
// import { emailUnicoValidator } from '../Validacaoemail.validador.ts/email-unico.validator'
// import { DatabaseModule } from 'src/database/database.module';
// import { usuarioProviders } from './usuario.providers';


// @Module({
//   imports: [DatabaseModule],
//   controllers: [UsuarioController],
//   providers: [...usuarioProviders,
//     UsuarioService,
//   ],

// })
// export class UsuarioModule {}