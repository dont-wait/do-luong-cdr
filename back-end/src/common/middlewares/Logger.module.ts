import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RequestLoggerMiddleware } from './Logger.middleware';
import { RequestLoggerOptions } from '../../types/logger';

@Global()
@Module({
  providers: [RequestLoggerMiddleware],
  exports: [RequestLoggerMiddleware],
})
export class RequestLoggerModule {
  static register(options?: RequestLoggerOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: 'REQUEST_LOGGER_OPTIONS',
      useValue: options || {},
    };

    return {
      module: RequestLoggerModule,
      providers: [optionsProvider, RequestLoggerMiddleware],
      exports: [RequestLoggerMiddleware],
    };
  }
}