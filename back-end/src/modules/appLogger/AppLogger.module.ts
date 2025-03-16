import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './AppLogger.service';
import { RequestLoggerModule } from '../../common/middlewares/Logger.module';

@Global()
@Module({
  imports: [
    RequestLoggerModule.register({
      logHeaders: false,
      logParams: true,
      excludePaths: [''],
      logBody: process.env.NODE_ENV !== 'production',
    }),
  ],
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class AppLoggerModule {}