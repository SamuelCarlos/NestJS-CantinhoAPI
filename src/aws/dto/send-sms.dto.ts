import { IsPhoneNumber, IsString } from 'class-validator';

export class SendSMSDto {
  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  message: string;
}
