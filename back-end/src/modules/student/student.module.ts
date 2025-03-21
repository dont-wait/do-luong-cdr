import { Module } from '@nestjs/common';
import { StudentService } from './Student.service';
import { AcademicService } from '../academic/Academic.service';
import { StudentController } from './Student.controller';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
