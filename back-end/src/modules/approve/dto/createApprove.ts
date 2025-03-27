import { IsNotEmpty, IsString, IsObject } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateApproveDto {
    @ApiProperty({
        description: 'The ID of the sender',
        example: 'user123'
    })
    @IsString()
    @IsNotEmpty()
    sender_id: string;

    @ApiProperty({
        description: 'The ID of the receiver',
        example: 'user456'
    })
    @IsString()
    @IsNotEmpty()
    receiver_id: string;

    @ApiProperty({
        description: 'The ID of the subject',
        example: 'subject789'
    })
    @IsString()
    @IsNotEmpty()
    subject_id: string;

    @ApiProperty({
        description: 'The approval data object',
        example: { status: 'approved', comment: 'Looks good' }
    })
    @IsNotEmpty()
    @IsObject()
    approveData: object;
}