import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreatePloCloDto {
    @ApiProperty({
        description: 'PLO ID',
        type: String,
    })
    @IsString()
    plo_id: string;

    @ApiProperty({
        description: 'CLO ID',
        type: String,
    })
    @IsString()
    clo_id: string;
}
