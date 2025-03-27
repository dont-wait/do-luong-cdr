import { Module } from '@nestjs/common';
import { StudentService } from './Student.service';
import { StudentController } from './Student.controller';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
