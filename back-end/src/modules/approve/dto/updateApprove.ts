import { IsNotEmpty, IsBoolean, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApproveDto {
    @ApiProperty({
        description: 'The ID of the sender',
        example: '123456'
    })
    @IsString()
    @IsNotEmpty()
    sender_id: string;

    @ApiProperty({
        description: 'The ID of the receiver',
        example: '789012'
    })
    @IsString()
    @IsNotEmpty()
    receiver_id: string;

    @ApiProperty({
        description: 'Approval status',
        example: true
    })
    @IsBoolean()
    @IsNotEmpty()
    approve: boolean;
}
