import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsInt } from "class-validator";

export class CreateCloDto {
    @ApiProperty({
        description: 'CLO ID',
        type: String,
        nullable: false
    })
    @IsNotEmpty()
    clo_name: string;
 
    @ApiProperty({
        description: 'CLO content',
        type: String,
        nullable: false
    })
    @IsString()
    clo_content: string;

    @ApiProperty({ 
        description: 'CLO level',
        type: String,
        required: false }) 
    @IsOptional() 
    clo_parent_id?: string; 

    @ApiProperty({
        description: 'subject ID',
        type: String,
        nullable: false
    })
    @IsNotEmpty()
    subject_id: string;

    // @ApiProperty({
    //     description: 'Plo ID',
    //     type: String,
    //     required: true
    // })
    // @IsString()
    // plo_id: string;
}
