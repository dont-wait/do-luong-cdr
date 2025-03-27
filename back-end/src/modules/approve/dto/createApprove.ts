import { IsNotEmpty, IsString, IsObject } from "class-validator";

export class CreateApproveDto {
    @IsString()
    @IsNotEmpty()
    sender_id: string;

    @IsString()
    @IsNotEmpty()
    receiver_id: string;

    @IsString()
    @IsNotEmpty()
    subject_id: string;

    @IsNotEmpty()
    @IsObject()
    approveData: object;
}