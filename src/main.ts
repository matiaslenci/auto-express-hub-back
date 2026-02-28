import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Graceful shutdown (para Docker / PM2)
  app.enableShutdownHooks();

  // Seguridad HTTP: headers de protección
  // crossOriginResourcePolicy: 'cross-origin' permite que el frontend cargue
  // imágenes desde /uploads/ estando en un dominio/puerto diferente
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }));

  // Configurar CORS con orígenes específicos
  const allowedOrigins = (process.env.CORS_ORIGINS ?? '').split(',').filter(Boolean);
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true,   // Lanza error si se envían propiedades no permitidas
  }));

  // Serve static files from /uploads
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // Swagger solo disponible en desarrollo
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Auto Express Hub API')
      .setDescription('The API for the Auto Express Hub application.')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application running on port ${port} [${process.env.NODE_ENV || 'development'}]`);
}
bootstrap();
