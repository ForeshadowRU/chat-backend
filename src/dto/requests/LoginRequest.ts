import { IsNotEmpty, ValidateIf, IsBoolean } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: '$property is requried' })
  username: string;
  @ValidateIf(dto => !dto.isGoogleAccount)
  @IsNotEmpty({ message: '$property is required' })
  password: string;
  @IsBoolean({ message: `$property only accepts true/false values` })
  isGoogleAccount: Boolean;
}
