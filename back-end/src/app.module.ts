import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/student.module';
import { LecturerModule } from './modules/lecturer/lecturer.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [StudentModule, LecturerModule, PrismaModule],
})
export class AppModule {}
