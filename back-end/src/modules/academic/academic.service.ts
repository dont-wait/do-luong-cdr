import { Injectable } from '@nestjs/common';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { UpdateAcademicDto } from './dto/update-academic.dto';

@Injectable()
export class AcademicService {
  create(createAcademicDto: CreateAcademicDto) {
    return 'This action adds a new academic';
  }

  findAll() {
    return `This action returns all academic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} academic`;
  }

  update(id: number, updateAcademicDto: UpdateAcademicDto) {
    return `This action updates a #${id} academic`;
  }

  remove(id: number) {
    return `This action removes a #${id} academic`;
  }
}
