import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ status: 201, description: 'The question has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.createQuestion(createQuestionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a question by id' })
  @ApiResponse({ status: 200, description: 'The question has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  public async updateQuestion(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return await this.questionService.updateQuestion(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question by id' })
  @ApiResponse({ status: 200, description: 'The question has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  public async deleteQuestion(@Param('id') id: string) {
    return await this.questionService.deleteQuestion(id);
  }
}