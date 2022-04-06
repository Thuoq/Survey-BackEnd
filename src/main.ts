import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger'
import { runInCluster } from './runInCluster';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    })
  )
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
 
  app.enableCors({
    credentials:true,
    origin:true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, PUT, POST, DELETE',
  });
  await app.listen(3000);
}
runInCluster(bootstrap);
