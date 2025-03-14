import { Module } from '@nestjs/common';
import { AcademicService } from './academic.service';
import { AcademicController } from './academic.controller';

@Module({
  controllers: [AcademicController],
  providers: [AcademicService],
})
export class AcademicModule {}
