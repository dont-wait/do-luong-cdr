import { Module } from '@nestjs/common';
import { StudentService } from './Student.service';
import { StudentController } from './Student.controller';
import { PrismaModule } from '../prisma/Prisma.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
