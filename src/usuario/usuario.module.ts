// //classe de modulo do usuário, responsável por administrar todo o modulo de usuário, incluindo controller, DM, e validators, 
// //tudo o que o modulo de usuário contem, é adinistrado pela classe de módulo

import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service'; // Verifique o caminho correto
import { emailUnicoValidator } from '../Validacaoemail.validador.ts/email-unico.validator'

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, emailUnicoValidator],
  exports: [UsuarioService], // Se necessário, exporte para uso em outros módulos
})
export class UsuarioModule {}