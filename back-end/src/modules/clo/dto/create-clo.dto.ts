import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsInt } from "class-validator";

export class CreateCloDto {
    @ApiProperty()
    @IsNotEmpty()
    clo_name: string;
 
    @ApiProperty()
    @IsString()
    clo_content: string;

    @ApiProperty({ required: false }) 
    @IsOptional() 
    clo_parent_id?: string; 

    @ApiProperty()
    @IsNotEmpty()
    subject_id: string;
}
