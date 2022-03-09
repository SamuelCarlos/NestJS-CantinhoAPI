import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsPhoneNumber('BR')
  phone: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  password: string;

  @IsString()
  environmentName: string;

  @IsOptional()
  @IsString()
  environmentLogo?: string;

  @IsOptional()
  @IsNumber()
  environmentId: number;
}
