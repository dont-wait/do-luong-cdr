import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { getModules } from './utils/reflectModules';
import { RequestLoggerMiddleware } from './common/middlewares/Logger.middleware';

const dynamicModules = getModules().map(m => require(m.path)[m.name]);
@Module({
  imports: [...dynamicModules],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
