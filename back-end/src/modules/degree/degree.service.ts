import { Injectable } from '@nestjs/common';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { UpdateDegreeDto } from './dto/update-degree.dto';

@Injectable()
export class DegreeService {
  create(createDegreeDto: CreateDegreeDto) {
    return 'This action adds a new degree';
  }

  findAll() {
    return `This action returns all degree`;
  }

  findOne(id: number) {
    return `This action returns a #${id} degree`;
  }

  update(id: number, updateDegreeDto: UpdateDegreeDto) {
    return `This action updates a #${id} degree`;
  }

  remove(id: number) {
    return `This action removes a #${id} degree`;
  }
}
