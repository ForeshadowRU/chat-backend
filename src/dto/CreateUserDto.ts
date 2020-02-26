import { IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  @IsNotEmpty({ message: '$property is requried' })
  firstname: string;
  @IsNotEmpty({ message: '$property is requried' })
  lastname: string;
  @IsNotEmpty({ message: '$property is requried' })
  username: string;
  password: string;
  @IsBoolean({ message: `$property only accepts true/false values` })
  isGoogleAccount: Boolean;
}
