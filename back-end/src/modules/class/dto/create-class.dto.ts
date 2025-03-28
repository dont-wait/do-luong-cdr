import { IsNotEmpty, IsString } from "class-validator";

export class CreateClassDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    subject_id: string;

    @IsString()
    @IsNotEmpty()
    lecturer_id: string;
}
