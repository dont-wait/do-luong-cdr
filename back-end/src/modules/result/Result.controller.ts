import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ResultService } from './Result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('results')
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @ApiBody({ type: CreateResultDto, isArray: true })
  @ApiOperation({ summary: 'Create new Result' })
  @ApiResponse({
    status: 201,
    description: 'Result has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createResultDto: CreateResultDto | CreateResultDto[]) {
    return this.resultService.createResult(createResultDto);
  }

  @ApiOperation({ summary: 'Get all Results' })
  @ApiResponse({
    status: 200,
    description: 'List of results retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'No results found' })
  @Get()
  findAll() {
    return this.resultService.findAllResult();
  }

  @ApiOperation({ summary: 'Get Result by ID' })
  @ApiResponse({ status: 200, description: 'Result found' })
  @ApiResponse({ status: 404, description: 'Result ID not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.resultService.getResultById(id);
    if (!result) throw new NotFoundException(`Result with id ${id} not found`);
    return result;
  }

  @ApiOperation({ summary: 'Delete Result by ID' })
  @ApiResponse({ status: 204, description: 'Result deleted successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.resultService.removeResult(id);
    if (!deleted) throw new NotFoundException(`Result with id ${id} not found`);
  }

  @ApiOperation({ summary: 'Update Result by ID' })
  @ApiResponse({ status: 200, description: 'Result updated successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResultDto: CreateResultDto,
  ) {
    const updated = await this.resultService.updateResult(id, updateResultDto);
    if (!updated) throw new NotFoundException(`Result with id ${id} not found`);
    return updated;
  }

  @ApiOperation({ summary: 'Get all results of a student for a specific exam' })
  @ApiResponse({ status: 200, description: 'Results retrieved successfully' })
  @ApiResponse({
    status: 404,
    description: 'No results found for given student and exam',
  })
  @Get('by-student-and-exam/:studentId/:examId')
  async getResultsByStudentAndExam(
    @Param('studentId') studentId: string,
    @Param('examId') examId: string,
  ) {
    const results = await this.resultService.findResultsByStudentAndExam(
      studentId,
      examId,
    );
    if (!results || results.length === 0) {
      throw new NotFoundException(
        `No results found for student ${studentId} in exam ${examId}`,
      );
    }
    return results;
  }

  @ApiOperation({ summary: 'Get total score of a student for a specific exam' })
  @ApiResponse({
    status: 200,
    description: 'Total score retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'No results found for given student and exam',
  })
  @Get('total-score/:studentId/:examId')
  async getTotalScore(
    @Param('studentId') studentId: string,
    @Param('examId') examId: string,
  ) {
    const result = await this.resultService.getTotalScoreByStudentAndExam(
      studentId,
      examId,
    );
    return result;
  }

  @Get('total-score-by-clo/:studentId/:cloId')
  @ApiOperation({
    summary:
      'Get total score and max_score for a CLO (and its children) by student',
  })
  @ApiResponse({
    status: 200,
    description: 'Total score retrieved successfully',
  })
  async getTotalScoreByCLO(
    @Param('studentId') studentId: string,
    @Param('cloId') cloId: string,
  ) {
    return this.resultService.getTotalScoreByCLOAndStudent(studentId, cloId);
  }

  @Get('root-clos/by-class/:classId')
  @ApiOperation({ summary: 'Lấy CLO gốc theo classId (dựa trên kết quả)' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách CLO gốc được lấy thành công',
  })
  async getRootCLOsByClass(@Param('classId') classId: string) {
    return this.resultService.getRootClosInClassResults(classId);
  }
}
