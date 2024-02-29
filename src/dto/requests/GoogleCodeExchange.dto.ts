import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleCodeExchangeDto {
  @IsString({ message: '$property должно быть строкой' })
  @IsNotEmpty({ message: '$property не должен быть пустым' })
  @ApiProperty({ type: String, description: 'Код от Google', required: true })
  code: string;
}
