import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { AcademicSubjectService } from '../academicSubject/AcademicSubject.service';
import { LecturerService } from '../lecturer/Lecturer.service';

@Injectable()
export class SubjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly academicSubjectService: AcademicSubjectService,
  ) {}

  public async createSubject(createSubjectDto: CreateSubjectDto) {
    try {
      const { academic_id, lecturer_id, ...subject } = createSubjectDto;
      let subjectId = createSubjectDto.id;
    
      const existingSubject = subjectId
        ? await this.prisma.subject.findUnique({ where: { id: subjectId } })
        : null;
  
      if (existingSubject) { // đã tôn tại subject, chỉ thêm vào
        const validLecturers = await this.prisma.lecturer.findMany({
          where: { id: { in: lecturer_id } },
          select: { id: true },
        });

        const validLecturerIds = validLecturers.map(a => a.id);
        const invalidLecturerIds = lecturer_id.filter(id => !validLecturerIds.includes(id));

        if (invalidLecturerIds.length > 0) 
          throw new BadRequestException(`Invalid lecturer IDs: ${invalidLecturerIds.join(', ')}`);
        

        await this.prisma.lecturerSubject.createMany({
          data: lecturer_id.map(lecturerId => ({
            lecturer_id: lecturerId,
            subject_id: subjectId,
          })),
        });

        return {
          ...subject,
          lecturer_id,
          id: subjectId,
          academic_id,
        };
      } 

      const newSubject = await this.prisma.subject.create({
        data: {
          ...subject,
          LecturerSubject: {
            create: lecturer_id.map(lecturer_id => ({
              lecturer: { connect: { id: lecturer_id } },
            })),
          },
        },
        include: { LecturerSubject: true },
      });
  
      subjectId = newSubject.id;
      
      for (const aId of academic_id) {
        const academic = await this.prisma.academic.findUnique({
          where: { id: aId },
        });

        if (!academic) {
          throw new BadRequestException(`Academic with ID ${aId} not found`);
        }
      }
      await this.academicSubjectService.createAcademicSubject(
        subjectId,
        academic_id,
      );

      return {
        ...subject,
        lecturer_id,
        id: subjectId,
        academic_id,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create subject: ' + error.message,
      );
    }
  }

  public async getAllSubjects() {
    return await this.prisma.subject.findMany();
  }

  public async getSubjectById(id: string) {
    return await this.prisma.subject.findUnique({
      where: { id },
      include: { LecturerSubject: true },
    });
  }
}
