import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePloDto {
    @ApiProperty({description: 'The Plo name', example: ''})
    @IsString()
    @IsNotEmpty()
    plo_name: string;

    @ApiProperty({description: 'The Plo content', example: ''})
    @IsNotEmpty()
    @IsString()
    plo_content: string;

    @ApiProperty({ description: 'The academic ID', example: '' })
    @IsString()
    academic_id: string;
}
