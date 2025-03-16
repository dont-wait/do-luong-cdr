import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, INestApplication, ConsoleLogger } from '@nestjs/common';
import { AppLoggerService } from './modules/appLogger/AppLogger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: new ConsoleLogger({
      prefix: "HUIT-CDR"
    })
  });

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
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
}

function setupGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
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