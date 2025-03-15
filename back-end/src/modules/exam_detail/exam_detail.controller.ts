import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamDetailService } from './exam_detail.service';
import { CreateExamDetailDto } from './dto/create-exam_detail.dto';
import { UpdateExamDetailDto } from './dto/update-exam_detail.dto';

@Controller('exam-detail')
export class ExamDetailController {
  constructor(private readonly examDetailService: ExamDetailService) {}

  @Post()
  create(@Body() createExamDetailDto: CreateExamDetailDto) {
    return this.examDetailService.create(createExamDetailDto);
  }

  @Get()
  findAll() {
    return this.examDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDetailDto: UpdateExamDetailDto) {
    return this.examDetailService.update(+id, updateExamDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examDetailService.remove(+id);
  }
}
