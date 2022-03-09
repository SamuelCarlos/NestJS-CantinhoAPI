import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { EnvironmentsService } from 'src/environments/environments.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateToken, hashPassword } from 'src/utils';
import { ConfirmSMSDto } from './dto/confirm-sms.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private aws: AwsService,
    private environments: EnvironmentsService,
  ) {}

  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const SMS_TOKEN = generateToken();

    const environment = await this.environments.create({
      name: createUserDto.environmentName,
      logo: createUserDto.environmentLogo || null,
    });

    const response = await this.prisma.user
      .create({
        data: {
          phone: createUserDto.phone,
          name: createUserDto.name,
          password: await hashPassword(createUserDto.password),
          token: SMS_TOKEN,
          isVerified: false,
          environmentId: environment.id,
        },
      })
      .catch((reason) => {
        throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    await this.aws
      .sendSMS({
        message: `CANTINHO - Seu codigo eh: ${SMS_TOKEN}`,
        phone: createUserDto.phone,
      })
      .catch((reason) => {
        throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return new User(response);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const SMS_TOKEN = generateToken();

    const environment = await this.environments
      .findOne(createUserDto.environmentId)
      .catch((reason) => {
        throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    const response = await this.prisma.user
      .create({
        data: {
          phone: createUserDto.phone,
          name: createUserDto.name,
          password: await hashPassword(createUserDto.password),
          token: SMS_TOKEN,
          isVerified: false,
          environmentId: environment.id,
        },
      })
      .catch((reason) => {
        throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    await this.aws
      .sendSMS({
        message: `CANTINHO - Seu codigo eh: ${SMS_TOKEN}`,
        phone: createUserDto.phone,
      })
      .catch((reason) => {
        throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return new User(response);
  }

  async confirmSMS(confirmSMSDto: ConfirmSMSDto): Promise<User> {
    const user = await this.prisma.user
      .findUnique({
        where: { phone: confirmSMSDto.phone },
      })
      .catch((reason) => {
        throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    if (confirmSMSDto.token !== user.token) {
      throw new HttpException('Incorrect token', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this.update(user.id, {
      isVerified: true,
      token: null,
    }).catch((reason) => {
      throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    return new User(updatedUser);
  }

  async findAll(): Promise<User[]> {
    const response = await this.prisma.user.findMany();

    return response.map((user) => new User(user));
  }

  async findOne(id: number): Promise<User> {
    const response = await this.prisma.user.findUnique({ where: { id } });

    if (!response)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return new User(response);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const response = await this.prisma.user
      .update({
        where: { id },
        data: updateUserDto,
      })
      .catch(() => {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      });

    return new User(response);
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } }).catch(() => {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    });

    return 'User successfully deleted';
  }
}
