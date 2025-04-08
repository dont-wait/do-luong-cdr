import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreatePloCloDto {
    @ApiProperty({
        description: 'PLO ID',
        type: String,
        nullable: true
    })
    @IsString()
    plo_id: string;

    @ApiProperty({
        description: 'CLO ID',
        type: String,
        nullable: true
    })
    @IsString()
    clo_id: string;
}
