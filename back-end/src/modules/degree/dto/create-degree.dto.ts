import { IsNotEmpty, IsString } from "class-validator";

export class CreateDegreeDto {
    @IsNotEmpty()
    degree_id: number;

    @IsNotEmpty()
    @IsString()
    degree_name: string;
}
