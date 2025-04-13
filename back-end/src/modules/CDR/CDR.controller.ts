import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiResponse } from "@nestjs/swagger";
import { CDRService } from "./CDR.service";
@ApiTags('cdr')
@Controller('cdr')
export class CDRController {
  constructor(private readonly cdrService: CDRService) {}
    @Get('grading/:id_class')
    @ApiOperation({ summary: 'grading for students' })
    @ApiOkResponse({ description: 'Grading for students successfully' })
    @ApiResponse({ status: 404, description: 'Grading for students failed' })
    async gradingForStudents(id_class: string) {
        return this.cdrService.gradingForStudents(id_class);
    }
}
