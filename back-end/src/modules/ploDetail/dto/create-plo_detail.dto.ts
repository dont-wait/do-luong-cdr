import { IsString, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePloDetailDto {
  @ApiProperty({
    example: 'plod001',
    description: 'Mã chi tiết chuẩn đầu ra',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'PLO1.1',
    description: 'Tên chi tiết chuẩn đầu ra',
  })
  @IsString()
  @IsNotEmpty()
  plo_detail_name: string;

  @ApiProperty({
    example: 'Người học có khả năng áp dụng kiến thức nền tảng về khoa học.',
    description: 'Nội dung chi tiết chuẩn đầu ra',
  })
  @IsString()
  @IsNotEmpty()
  plo_content: string;

  @ApiProperty({
    example: 'PLO1',
    description: 'Mã chuẩn đầu ra (PLO) cha',
  })
  @IsString()
  @IsNotEmpty()
  plo_id: string;
}

