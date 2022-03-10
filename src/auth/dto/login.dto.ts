import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
