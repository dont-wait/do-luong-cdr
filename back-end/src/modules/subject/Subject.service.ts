import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { AcademicSubjectService } from '../academicSubject/AcademicSubject.service';

@Injectable()
export class SubjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly academicSubjectService: AcademicSubjectService
  ) {}

  public async createSubject(createSubjectDto: CreateSubjectDto) {
    const { academic_id, ...subject } = createSubjectDto;
  
    const lecturer = await this.prisma.lecturer.findUnique({
      where: { id: createSubjectDto.lecturer_id },
    });
  
    if (!lecturer) {
      throw new BadRequestException(`Lecturer with ID ${createSubjectDto.lecturer_id} not found`);
    }
  
    let subjectId = createSubjectDto.id;
  
    let existingSubject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });
  
    if (!existingSubject) {
      const newSubject = await this.prisma.subject.create({ data: subject });
      subjectId = newSubject.id;
    }
  
    try {
      for (const aId of academic_id) {
        const academic = await this.prisma.academic.findUnique({ where: { id: aId } });
  
        if (!academic) {
          throw new BadRequestException(`Academic with ID ${aId} not found`);
        }
  
      }
      await this.academicSubjectService.createAcademicSubject(subjectId, academic_id);
  
      return {
        ...subject,
        id: subjectId,
        academic_id,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create subject: ' + error.message);
    }
  }  

  public async getAllSubjects() {
    return await this.prisma.subject.findMany();
  }

  public async getSubjectById(id: string) {
    return await this.prisma.subject.findUnique({
      where: { id },
    });
  }
}
