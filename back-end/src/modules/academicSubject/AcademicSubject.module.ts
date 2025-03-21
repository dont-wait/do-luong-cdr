import { Module } from '@nestjs/common';
import { AcademicSubjectService } from './AcademicSubject.service';
import { AcademicSubjectController } from './AcademicSubject.controller';

@Module({
  controllers: [AcademicSubjectController],
  providers: [AcademicSubjectService],
})
export class AcademicSubjectModule {}
