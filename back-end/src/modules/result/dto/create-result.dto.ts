import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";

export class CreateResultDto {
    @ApiProperty({
        description: 'Result score',
        type: String,
        nullable: false,
        example: 4
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    score: number;
    
    @ApiProperty({
        description: 'Result student ID',
        type: String,
        nullable: false,
        example: "ST001"
    })
    @IsString()
    @IsNotEmpty()
    student_id: string;

    @ApiProperty({
        description: 'Result question ID',
        type: String,
        nullable: false,
        example: ""
    })
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    question_id: string;
}
