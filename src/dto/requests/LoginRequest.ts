import { IsNotEmpty, ValidateIf, IsBoolean } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: '$property is requried' })
  username: string;
  @ValidateIf(dto => !dto.isGoogleAccount)
  @IsNotEmpty({ message: '$property is required' })
  password: string;
  isGoogleAccount: Boolean;
}
