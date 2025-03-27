import { Length,IsString } from "class-validator";

export class CreatePloDetailDto {
    @IsString()
    id: string;
  
    @IsString()
    @Length(1, 10) 
    plo_detail_name: string;
  
    @IsString()
    @Length(1, 255)
    plo_content: string;
  
    @IsString()
    plo_id: string;
}
