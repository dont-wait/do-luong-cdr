import { forwardRef, Module} from '@nestjs/common';
import { StudentService } from './Student.service';
import { StudentController } from './Student.controller';
import { PrismaService } from '../prisma/Prisma.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService],
  exports: [StudentService],
})
export class StudentModule {}
