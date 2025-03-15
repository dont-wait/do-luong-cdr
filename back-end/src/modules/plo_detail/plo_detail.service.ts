import { Injectable } from '@nestjs/common';
import { CreatePloDetailDto } from './dto/create-plo_detail.dto';
import { UpdatePloDetailDto } from './dto/update-plo_detail.dto';

@Injectable()
export class PloDetailService {
  create(createPloDetailDto: CreatePloDetailDto) {
    return 'This action adds a new ploDetail';
  }

  findAll() {
    return `This action returns all ploDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ploDetail`;
  }

  update(id: number, updatePloDetailDto: UpdatePloDetailDto) {
    return `This action updates a #${id} ploDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} ploDetail`;
  }
}
