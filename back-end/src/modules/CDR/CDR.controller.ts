import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { CDRService } from './CDR.service';
import { MultiExamDto } from 'src/utils/SaveDataExam.dto';
import { StudentResult } from './CDR.service';
@ApiTags('cdr')
@Controller('cdr')
export class CDRController {
  constructor(private readonly cdrService: CDRService) {}
  @Get('grading/:id_class')
  @ApiOperation({ summary: 'grading for students' })
  @ApiOkResponse({ description: 'Grading for students successfully' })
  @ApiResponse({ status: 404, description: 'Grading for students failed' })
  async gradingForStudents(
    @Param('id_class') id_class: string,
  ): Promise<{ statusCode: number; message: string; data: StudentResult[] }> {
    return this.cdrService.gradingForStudents(id_class);
  }
  @Post('SaveData')
  @ApiOperation({ summary: 'Save data for students' })
  @ApiOkResponse({ description: 'Save data for students successfully' })
  @ApiResponse({ status: 404, description: 'Save data for students failed' })
  async saveDataForStudents(@Body() Data: MultiExamDto) {
    return this.cdrService.SaveDataForStudent(Data);
  }
}
