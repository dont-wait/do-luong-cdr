import { Injectable } from '@nestjs/common';
import { CreateAcademicSubjectDto } from './dto/create-academic_subject.dto';
import { UpdateAcademicSubjectDto } from './dto/update-academic_subject.dto';

@Injectable()
export class AcademicSubjectService {
  create(createAcademicSubjectDto: CreateAcademicSubjectDto) {
    return 'This action adds a new academicSubject';
  }

  findAll() {
    return `This action returns all academicSubject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} academicSubject`;
  }

  update(id: number, updateAcademicSubjectDto: UpdateAcademicSubjectDto) {
    return `This action updates a #${id} academicSubject`;
  }

  remove(id: number) {
    return `This action removes a #${id} academicSubject`;
  }
}
