import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClassStudentDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '2001230753', description: 'ID của sinh viên' })
    studentId: String;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1000101003473(ma lop chuan com | CL001(ma lop test))', description: 'ID của lớp học' })
    classId: String;
}