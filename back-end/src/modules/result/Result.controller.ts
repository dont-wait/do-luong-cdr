import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import { ResultService } from './Result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('results')
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @ApiOperation({ summary: 'Create new Result' })
  @ApiResponse({ status: 201, description: 'Result has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createResultDto: CreateResultDto | CreateResultDto[]) {
    return this.resultService.createResult(createResultDto);
  }

  @ApiOperation({ summary: 'Get all Results' })
  @ApiResponse({ status: 200, description: 'List of results retrieved successfully' })
  @Get()
  findAll() {
    return this.resultService.findAllResult();
  }

  @ApiOperation({ summary: 'Get Result by ID' })
  @ApiResponse({ status: 200, description: 'Result found' })
  @ApiResponse({ status: 404, description: 'Result not found' })
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
}