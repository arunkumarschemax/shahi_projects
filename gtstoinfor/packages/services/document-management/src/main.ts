import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
// import { appConfig } from '../config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: ['error']});
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  // }));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3002;

  const options = new DocumentBuilder()
    .setTitle('Documents management API Service')
    .setDescription('')
    .setVersion('2.0')
    // .setBasePath(`${ptsConfigs.swagger.basePath}`)
    .addBearerAuth()
    .addTag('ina')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`api`, app, document);
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.enableCors();
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();

