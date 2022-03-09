import { IsPhoneNumber, IsString } from 'class-validator';

export class ConfirmSMSDto {
  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  token: string;
}
