import {
  IsNotEmpty,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateServerRequest {
  @IsNotEmpty({ message: '$property is required' })
  name: string;
  @IsNotEmpty({ message: '$property is requried' })
  description: string;
  @IsArray({ message: '$property must be an array of member ids' })
  @IsNumber({}, { each: true, message: '$property accepts only users' })
  members: Array<number>;
}
