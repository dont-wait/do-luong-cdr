import { Module} from '@nestjs/common';
import { StudentService } from './Student.service';
import { StudentController } from './Student.controller';
import { PrismaService } from '../prisma/Prisma.service';
import { ClassStudentService } from '../classStudent/ClassStudent.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService, ClassStudentService],
  exports: [StudentService],
})
export class StudentModule {}
