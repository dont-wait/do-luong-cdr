import { forwardRef, Module} from '@nestjs/common';
import { StudentService } from './Student.service';
import { StudentController } from './Student.controller';
import { PrismaService } from '../prisma/Prisma.service';
import { ClassStudentService } from '../classStudent/ClassStudent.service';
import { ClassStudentModule } from '../classStudent/ClassStudent.module';
import { ClassModule } from '../class/Class.module';

@Module({
  imports: [forwardRef(() => ClassStudentModule), ClassModule],
  controllers: [StudentController],
  providers: [StudentService, PrismaService, ClassStudentService],
  exports: [StudentService],
})
export class StudentModule {}
