import { Global, Module } from '@nestjs/common';
import { SubjectService } from './Subject.service';
import { SubjectController } from './Subject.controller';
import { AcademicSubjectService } from '../academicSubject/AcademicSubject.service';

@Global()
@Module({
  controllers: [SubjectController],
  providers: [SubjectService, AcademicSubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
