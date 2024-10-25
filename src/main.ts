import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //Si no tienen instalado cors -> npm install cors
  app.enableCors({
    origin: 'http://localhost:8081', // Permitir el frontend (ajusta el puerto según lo que necesites)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permitir enviar cookies o credenciales
  });

  await app.listen(process?.env?.APP_PORT || 3002);
}
bootstrap();
