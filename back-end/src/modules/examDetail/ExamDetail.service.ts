import { Injectable } from '@nestjs/common';
import { CreateExamDetailDto } from './dto/create-exam_detail.dto';
import { UpdateExamDetailDto } from './dto/update-exam_detail.dto';

@Injectable()
export class ExamDetailService {
  create(createExamDetailDto: CreateExamDetailDto) {
    return 'This action adds a new examDetail';
  }

  findAll() {
    return `This action returns all examDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examDetail`;
  }

  update(id: number, updateExamDetailDto: UpdateExamDetailDto) {
    return `This action updates a #${id} examDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} examDetail`;
  }
}
