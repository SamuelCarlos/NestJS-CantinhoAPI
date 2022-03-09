import { HttpException, Injectable } from '@nestjs/common';
import { SendSMSDto } from './dto/send-sms.dto';

import { config, Credentials, SNS } from 'aws-sdk';

@Injectable()
export class AwsService {
  async sendSMS(sendSMSDto: SendSMSDto) {
    const sns = this.createSNS();

    await sns
      .setSMSAttributes({
        attributes: {
          DefaultSMSType: 'Transactional',
        },
      })
      .promise()
      .catch((reason) => {
        console.log(reason);
        throw new HttpException('Unable to set SMS attributes', 500);
      });

    const messageData = await sns
      .publish({
        Message: sendSMSDto.message,
        PhoneNumber: sendSMSDto.phone,
      })
      .promise()
      .catch(() => {
        throw new HttpException('Unable to send SMS', 500);
      });

    return messageData;
  }

  createSNS() {
    const ID = process.env.AWS_ACCESS_ID || '';
    const SECRET = process.env.AWS_ACCESS_SECRET || '';
    const REGION = process.env.AWS_REGION || '';

    config.credentials = new Credentials(ID, SECRET);

    config.update({ region: REGION });

    return new SNS({
      region: 'us-east-2', // THIS IS US-EAST-2 BECAUSE SNS IS ON SANDBOX MODE
    });
  }
}
