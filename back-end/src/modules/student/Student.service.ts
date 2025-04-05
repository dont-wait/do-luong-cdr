import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { AcademicService } from '../academic/Academic.service';
import { UserAccountService } from '../userAccount/UserAccount.service';
import { roles } from '../../configs/config.json';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly academic: AcademicService,
    private readonly userAccount: UserAccountService,
  ) {}

  public getAllStudents() {
    return this.prisma.student.findMany();
  }

  public getStudent(id: string) {
    const student = this.prisma.student.findFirst({
      where: {
        id,
      },
    });

    if (!student) throw new NotFoundException('Không tìm thấy Student ID này');

    return student;
  }

  public async createStudent(data: CreateStudentDto) {
    const { academic_id, id, password, ...rest } = data;
    const isExistAcademicId = await this.academic.getAcademicById(academic_id);

    if (!isExistAcademicId)
      throw new BadRequestException('Academic ID không hợp lệ');

    const studentRole = roles.find((r) => r.role_name === 'student');

    if (!studentRole?.role_id)
      throw new BadRequestException('Không tìm thấy role student');

    try {
      const createUserAccountDto = {
        student_id: id,
        password,
        role_id: studentRole.role_id,
        admin_id: null,
        lecturer_id: null,
      };

      await this.prisma.student.create({
        data: {
          id,
          academic_id,
          ...rest,
        },
      });

      await this.userAccount.createUserAccount(createUserAccountDto, password);

      return {
        id,
        academic_id,
        ...rest,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
