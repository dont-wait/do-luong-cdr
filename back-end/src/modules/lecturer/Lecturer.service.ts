import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { UserAccountService } from '../userAccount/UserAccount.service';
import { DegreeService } from '../degree/Degree.service';
import { AcademicService } from '../academic/Academic.service';
import { roles } from '../../configs/config.json';

@Injectable()
export class LecturerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userAccount: UserAccountService,
    private readonly degree: DegreeService,
    private readonly academic: AcademicService,
  ) {}

  public async createLecturer(data: CreateLecturerDto) {
    const { password, degree_id, academic_id, id, ...rest } = data;

    if (!(await this.academic.getAcademicById(academic_id)))
      throw new BadRequestException(
        `Không tìm thấy Academic Id ${academic_id}`,
      );

    if (!(await this.degree.getDegreeById(degree_id)))
      throw new BadRequestException(`Không tìm thấy Degree Id ${degree_id}`);

    const lecturerRole = roles.find((r) => r.role_name === 'lecturer');

    if (!lecturerRole?.role_id)
      throw new BadRequestException('Không tìm thấy role lecturer');

    const userAccountData = {
      ...rest,
      lecturer_id: id,
      admin_id: null,
      role_id: lecturerRole.role_id,
    };

    await this.prisma.lecturer.create({
      data: {
        ...rest,
        id,
        academic_id,
        degree_id,
      },
    });

    await this.userAccount.createUserAccount(userAccountData, password);

    return {
      id,
      ...rest,
      degree_id,
      academic_id,
    };
  }

  public async getAllLecturer() {
    return this.prisma.lecturer.findMany();
  }

  public async getLecturerById(lecturer_id: string) {
    return this.prisma.lecturer.findUnique({
      where: {
        id: lecturer_id,
      },
      include: {
        subjects: true,
        LecturerSubject: true,
      },
    });
  }
  public async updateLecturer(lecturer_id: string, data: CreateLecturerDto) {
    const { password, id, ...updateData } = data;
    const lecturerRole = roles.find((r) => r.role_name === 'lecturer');

    if (!lecturerRole?.role_id)
      throw new BadRequestException('Không tìm thấy role lecturer');

    const userAccountData = {
      ...updateData,
      lecturer_id: id,
      admin_id: null,
      role_id: lecturerRole.role_id,
    };

    await this.userAccount.updateUserAccount(userAccountData, password);

    return await this.prisma.lecturer.update({
      where: {
        id: lecturer_id,
      },
      data: updateData,
    });
  }
  public async removeLecturer(lecturer_id: string) {
    return this.prisma.lecturer.delete({
      where: {
        id: lecturer_id,
      },
    });
  }
}
