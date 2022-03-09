import { Controller, Post, Body } from '@nestjs/common';
import { AwsService } from './aws.service';
import { SendSMSDto } from './dto/send-sms.dto';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post()
  sendSMS(@Body() sendSMSDto: SendSMSDto) {
    return this.awsService.sendSMS(sendSMSDto);
  }
}
