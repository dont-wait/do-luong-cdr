import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, INestApplication, ConsoleLogger } from '@nestjs/common';
import { AppLoggerService } from './modules/appLogger/AppLogger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpResponseInterceptor } from './common/interceptors/HttpResponse.interceptor';
import { HttpExceptionFilter } from './common/filter/HttpException.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: new ConsoleLogger({
      prefix: "HUIT-CDR"
    })
  });

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX!);
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter);

  const config = new DocumentBuilder()
    .setTitle('API DOCUMENTS')
    .setDescription('Tài liệu api của CDR')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${process.env.GLOBAL_PREFIX}/docs`, app, documentFactory);

  const logger = app.get(AppLoggerService);

  setupMiddleware(app);
  setupGlobalPipes(app);
  setupGracefulShutdown(app, logger);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.logStartup(+port, process.env.NODE_ENV || 'development');
}

function setupMiddleware(app: INestApplication) {
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Pragma", "Expires"], 
    credentials: true
  });
}

function setupGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: false,
    }),
  );
}

function setupGracefulShutdown(app: INestApplication, logger: AppLoggerService) {
  const signals = ['SIGTERM', 'SIGINT'];

  signals.forEach(signal => {
    process.on(signal, async () => {
      logger.logShutdown(signal);

      await app.close();

      process.exit(0);
    });
  });

  process.on('uncaughtException', (error) => {
    logger.logUnhandledException(error);
  });

  process.on('unhandledRejection', (reason) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    logger.logUnhandledException(error);
  });
}

function getLogLevels() {
  if (process.env.NODE_ENV === 'production') {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
}


bootstrap();