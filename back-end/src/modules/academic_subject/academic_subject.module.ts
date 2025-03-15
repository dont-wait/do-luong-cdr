import { Module } from '@nestjs/common';
import { AcademicSubjectService } from './academic_subject.service';
import { AcademicSubjectController } from './academic_subject.controller';

@Module({
  controllers: [AcademicSubjectController],
  providers: [AcademicSubjectService],
})
export class AcademicSubjectModule {}
