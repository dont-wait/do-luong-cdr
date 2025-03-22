import { Injectable } from '@nestjs/common';
import { CreatePloDto } from './dto/create-plo.dto';
import { UpdatePloDto } from './dto/update-plo.dto';

@Injectable()
export class PloService {
  create(createPloDto: CreatePloDto) {
    return 'This action adds a new plo';
  }

  findAll() {
    return `This action returns all plo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plo`;
  }

  update(id: number, updatePloDto: UpdatePloDto) {
    return `This action updates a #${id} plo`;
  }

  remove(id: number) {
    return `This action removes a #${id} plo`;
  }
}
