import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active CORS pour permettre les appels depuis le frontend
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  });

  // Active la validation globale avec class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // Renvoie une erreur si des propriétés non whitelistées sont envoyées
      transform: true, // Transforme automatiquement les types (string -> number par exemple)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
