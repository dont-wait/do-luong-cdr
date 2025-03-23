import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDepartmentDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The unique identifier of the department',
        example: 'CNTT'
    })
    id: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The name of the department',
        example: 'Công nghệ thông tin'
    })
    department_name: string;
}
