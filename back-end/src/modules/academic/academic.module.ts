import { Global, Module } from '@nestjs/common';
import { AcademicService } from './Academic.service';
import { AcademicController } from './Academic.controller';

@Global()
@Module({
  controllers: [AcademicController],
  providers: [AcademicService],
  exports: [AcademicService]
})
export class AcademicModule {}
