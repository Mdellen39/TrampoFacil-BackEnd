//classe de modulo do aplicativo, responsável por administrar todos os modulos da aplicação, 
// No caso temos o usuario Module.

import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}


