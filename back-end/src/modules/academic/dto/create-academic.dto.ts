import { IsNotEmpty, isString, IsString } from "class-validator";


export class CreateAcademicDto {
    @IsString()
    @IsNotEmpty()
    academic_name: string;

    @IsNotEmpty()
    academic_level: number;

    @IsNotEmpty()
    academic_type: number;

    @IsString()
    department_id: string;
}
