import { IsNotEmpty, IsString } from "class-validator";


export class CreateDepartmanDto {
    @IsNotEmpty()
    @IsString()
    department_name: string;
}
