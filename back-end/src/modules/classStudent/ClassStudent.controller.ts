import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ClassStudentService } from "./ClassStudent.service";
import { CreateClassStudentDto } from "./dto/createClassStudent.dto";

@ApiTags('class-student')
@Controller('class-student')
export class ClassStudentController {
    constructor(private readonly classStudentService: ClassStudentService) {}

    @Get()
    @ApiOperation({ summary: 'Get on all class student' })
    getAllClassStudent() {
        return this.classStudentService.getAllClassStudent();
    }
    @Get('class/:classId')
    @ApiOperation({summary: 'get many student by class id'})
    getClassStudentByClassId(@Param('classId') classId) {
        return this.classStudentService.getInfoStudentsByClassId(classId);
    }

    @Get('student/:studentId')
    @ApiOperation({summary: 'get many class by student id'})
    getClassIdByStudentId(
        @Param('studentId') studentId) {
        if(!studentId)
            throw new BadRequestException('studentId is required');
        return this.classStudentService.getInfoClassByStudentId(studentId);
    }

    @Post()
    @ApiOperation({summary: 'Create class with many student'})
    createClassWithManyStudent(@Body() data: CreateClassStudentDto | CreateClassStudentDto[]) {
        return this.classStudentService.createClassStudent(data);
    }
}