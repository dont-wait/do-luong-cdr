import { Injectable } from '@nestjs/common';
import { CreatePloCloDto } from './dto/create-plo_clo.dto';
import { UpdatePloCloDto } from './dto/update-plo_clo.dto';

@Injectable()
export class PloCloService {
  create(createPloCloDto: CreatePloCloDto) {
    return 'This action adds a new ploClo';
  }

  findAll() {
    return `This action returns all ploClo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ploClo`;
  }

  update(id: number, updatePloCloDto: UpdatePloCloDto) {
    return `This action updates a #${id} ploClo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ploClo`;
  }
}
