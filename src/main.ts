import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger'
import { runInCluster } from './runInCluster';
import getLogLevels from './logger/getLogLevels';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    logger: getLogLevels(process.env.NODE_ENV === 'production')
  });
  app.use(cookieParser())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    })
  )
  
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder().setTitle("API Survey")
  .setDescription("API Cho ae JS09")
  .setVersion("1.0")
  .addBasicAuth()
  .build()

  const document = SwaggerModule.createDocument(app,swaggerConfig)
  SwaggerModule.setup('api',app,document,  {
    swaggerOptions: {
      persistAuthorization:true
    }
  })
  // {
  //   credentials:true,
  //   origin:true,
  //   allowedHeaders: 'Content-Type, Authorization',
  //   methods: 'GET, PUT, POST, DELETE',
  // }
  app.enableCors({
    credentials:true,
    origin:true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, PUT, POST, DELETE, PATCH',
  });
  const PORT = configService.get('PORT') ?? 3000;
  await app.listen(PORT);
}
runInCluster(bootstrap);
