import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClassStudentService } from "./ClassStudent.service";
import { CreateClassStudentDto } from "./dto/createClassStudent.dto";

@ApiTags('class-student')
@Controller('class-student')
export class ClassStudentController {
    constructor(private readonly classStudentService: ClassStudentService) {}

    @Get()
    @ApiOperation({ summary: 'Get on all class student' })
    @ApiResponse({ status: 200, description: 'Get all class student' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Class student info not found' })
    getAllClassStudent() {
        return this.classStudentService.getAllClassStudent();
    }
    @Get('class/:classId')
    @ApiResponse({ status: 200, description: 'Get all student by class id' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Class info not found' })
    @ApiOperation({summary: 'get many student by class id'})
    getClassStudentByClassId(@Param('classId') classId) {
        return this.classStudentService.getInfoStudentsByClassId(classId);
    }

    @Get('student/:studentId')
    @ApiResponse({ status: 200, description: 'Get all class by student id' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'student info not found' })
    @ApiOperation({summary: 'get many class by student id'})
    getClassIdByStudentId(
        @Param('studentId') studentId) {
        if(!studentId)
            throw new BadRequestException('studentId is required');
        return this.classStudentService.getInfoClassByStudentId(studentId);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'Create class student successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Class or student info not found' })
    @ApiOperation({summary: 'Create class with many student'})
    createClassWithManyStudent(@Body() data: CreateClassStudentDto | CreateClassStudentDto[]) {
        return this.classStudentService.createClassStudent(data);
    }
}