import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}

  async createClass(data: CreateClassDto | CreateClassDto[]) {
    if (Array.isArray(data)) {
      for (const c of data) {
        await this.validateClassData(c);
      }
      return this.prisma.class.createMany({ data });
    } else {
      await this.validateClassData(data);
      return this.prisma.class.create({ data });
    }
  }

  async getClassById(id: string) {
    const classData = await this.prisma.class.findUnique({ where: { id } });
    if (!classData) {
      throw new BadRequestException(`Class ID ${id} not found`);
    }
    return classData;
  }

  async getAllClasses() {
    return this.prisma.class.findMany();
  }

  async updateClass(id: string, newData: UpdateClassDto) {
    
    //Search class by id to update
    const existingClass = await this.prisma.class.findUnique({ where: { id } });
    if (!existingClass) {
      throw new BadRequestException(`Class ID ${id} not found`);
    }

    //Check if subject_id and lecturer_id wanna update but not exist in database
    const existingSubject = await this.prisma.subject.findUnique({ where: { id: newData.subject_id } });
    if (!existingSubject) {
      throw new BadRequestException(`Subject ID ${newData.subject_id} not found`);
    }

    const existingLecturer = await this.prisma.lecturer.findUnique({ where: { id: newData.lecturer_id } });
    if (!existingLecturer) {
      throw new BadRequestException(`Lecturer ID ${newData.lecturer_id} not found`);
    }

    return this.prisma.class.update({ where: { id }, data: newData });
  }

  async deleteClass(id: string) {
    const classData = await this.prisma.class.findUnique({ where: { id } });
    if (!classData) {
      throw new BadRequestException(`Class ID ${id} not found`);
    }
    return this.prisma.class.delete({ where: { id } });
  }


  //Validate for new class
  private async validateClassData(c: CreateClassDto) {
    
    const existingClass = await this.prisma.class.findUnique({ where: { id: c.id } });
    if (existingClass) {
      throw new BadRequestException(`Class ID ${c.id} already exists`);
    }
    
    const subjectExist = await this.prisma.subject.findUnique({ where: { id: c.subject_id } });
    if (!subjectExist) {
      throw new BadRequestException(`Subject ID ${c.subject_id} not found`);
    }
  
    const lecturerExist = await this.prisma.lecturer.findUnique({ where: { id: c.lecturer_id } });
    if (!lecturerExist) {
      throw new BadRequestException(`Lecturer ID ${c.lecturer_id} not found`);
    }
  }
}
