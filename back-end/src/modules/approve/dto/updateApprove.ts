import { IsNotEmpty, IsBoolean, IsString } from "class-validator";

export class UpdateApproveDto {
    @IsString()
    @IsNotEmpty()
    sender_id: string;

    @IsString()
    @IsNotEmpty()
    receiver_id: string;

    @IsBoolean()
    @IsNotEmpty()
    approve: boolean;
}
