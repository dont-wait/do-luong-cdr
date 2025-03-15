import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/student.module';
import { LecturerModule } from './modules/lecturer/lecturer.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { DepartmentModule } from './modules/department/department.module';
import { AcademicModule } from './modules/academic/academic.module';
import { SubjectModule } from './modules/subject/subject.module';

@Module({
  imports: [StudentModule, LecturerModule, PrismaModule, DepartmentModule, AcademicModule, SubjectModule],
})
export class AppModule {}
