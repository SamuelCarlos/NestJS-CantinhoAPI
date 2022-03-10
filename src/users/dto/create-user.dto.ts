import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsPhoneNumber('BR')
  phone: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  environmentName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  environmentLogo?: string;

  @IsOptional()
  @IsNumber()
  environmentId: number;
}
