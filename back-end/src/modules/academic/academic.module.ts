import { Module } from '@nestjs/common';
import { AcademicService } from './Academic.service';
import { AcademicController } from './Academic.controller';

@Module({
  controllers: [AcademicController],
  providers: [AcademicService],
})
export class AcademicModule {}
