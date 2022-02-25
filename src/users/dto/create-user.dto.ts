import { IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  name?: string;

  @IsString()
  password: string;
}
