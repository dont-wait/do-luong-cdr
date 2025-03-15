import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/student.module';
import { LecturerModule } from './modules/lecturer/lecturer.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { DepartmentModule } from './modules/department/department.module';
import { AcademicModule } from './modules/academic/academic.module';
import { SubjectModule } from './modules/subject/subject.module';
import { DegreeModule } from './modules/degree/degree.module';
import { RoleModule } from './modules/role/role.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserAccountModule } from './modules/user_account/user_account.module';
import { ResultModule } from './modules/result/result.module';
import { ExamModule } from './modules/exam/exam.module';
import { ExamDetailModule } from './modules/exam_detail/exam_detail.module';
import { ClassModule } from './modules/class/class.module';
import { PloDetailModule } from './modules/plo_detail/plo_detail.module';
import { PloModule } from './modules/plo/plo.module';
import { PloCloModule } from './modules/plo_clo/plo_clo.module';
import { CloModule } from './modules/clo/clo.module';
import { AcademicSubjectModule } from './modules/academic_subject/academic_subject.module';

@Module({
  imports: [StudentModule, LecturerModule, PrismaModule, DepartmentModule, AcademicModule, SubjectModule, DegreeModule, RoleModule, AdminModule, UserAccountModule, ResultModule, ExamModule, ExamDetailModule, ClassModule, PloDetailModule, PloModule, PloCloModule, CloModule, AcademicSubjectModule],
})
export class AppModule {}
