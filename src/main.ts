//arquivo com função de inicio da aplicação, responsável por iniciar o projeto e dar parametros de execução.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  await app.listen(3001);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )


const config = new DocumentBuilder()
.setTitle('O Presente projeto é para mostrar um site para a região que facilite a integração entre candidatos e empresas para contratação')
.setDescription(
  'A presente API tem como objetivo simular cadastros de possiveis candidatos para as presentes vagas',
)
.setVersion('1.0')
.addTag('usuario')
.addTag('')
.addTag('')
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


useContainer(app.select(AppModule),{fallbackOnErrors:true})
}
bootstrap();

