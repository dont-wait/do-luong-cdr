import { Body, Controller, Get, Param, Post, Patch, Delete, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './Question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@ApiTags('questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({ status: 200, description: 'Return all questions.' })
  public getAllQuestions() {
    return this.questionService.getAllQuestions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by id' })
  @ApiResponse({ status: 200, description: 'Return a question.' })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  public getQuestion(@Param('id') id: string) {
    return this.questionService.getQuestion(id);
  }

  @Get(':examId')
  @ApiOperation({summary: 'Get many questtion by examId'})
  @ApiResponse({status: 200, description: 'Return many question'})
  @ApiResponse({status: 404, description: 'ExamId not found'})
  public getManyQuestionByExamId(@Param('examId') examId: string) {
    return this.questionService.getAllQuestionsByExamId(examId);
  }

  @Post()
  @ApiBody({ type: CreateQuestionDto })
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ status: 201, description: 'The question has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.createQuestion(createQuestionDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question by id' })
  @ApiResponse({ status: 200, description: 'The question has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  public async deleteQuestion(@Param('id') id: string) {
    return await this.questionService.deleteQuestion(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a question by id' })
  @ApiResponse({ status: 200, description: 'The question has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  @ApiBody({ type: CreateQuestionDto })
  public async updateQuestion(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return await this.questionService.updateQuestion(id, updateQuestionDto);
  }
}