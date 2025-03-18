import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { AcademicService } from '../academic/Academic.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly academic: AcademicService
  ) {}
  
  public getAllStudents() {
    return this.prisma.student.findMany();
  }

  public async createStudent(data: CreateStudentDto) {
    const { academic_id } = data;
    const isExistAcademicId = await this.academic.getAcademicById(academic_id);

    if (!isExistAcademicId)
      throw new BadRequestException("Academic ID không hợp lệ");

    return this.prisma.student.create({
      data: data
    })
  }
}
