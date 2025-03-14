import { IsNotEmpty, IsString } from "class-validator";


export class CreateDepartmentDto {
    @IsNotEmpty()
    @IsString()
    department_name: string;
}
