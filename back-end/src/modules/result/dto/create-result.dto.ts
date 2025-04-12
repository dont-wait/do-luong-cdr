import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";

export class CreateResultDto {
    @ApiProperty({
        description: 'Score of the result',
        type: String,
        nullable: false,
        example: 2
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    score: number;
    
    @ApiProperty({
        description: 'Student ID',
        type: String,
        nullable: false,
        example: "ST001"
    })
    @IsString()
    @IsNotEmpty()
    student_id: string;

    @ApiProperty({
        description: 'Question ID',
        type: String,
        nullable: false,
        example: "uuid-1234-5678-9101-112131415161"
    })
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    question_id: string;


    @ApiProperty({
        description: 'Clo ID',
        type: String,
        nullable: false,
        example: "uuid-1234-5678-9101-112131415161"
    })
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    clo_id: string;

    @ApiProperty({
        description: 'Max score of the result',
        type: String,
        nullable: false,
        example: 2
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    max_score: number;
}
