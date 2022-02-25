import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateToken, hashPassword } from 'src/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const response = await this.prisma.user.create({
      data: {
        phone: createUserDto.phone,
        name: createUserDto.name,
        password: await hashPassword(createUserDto.password),
        token: generateToken(),
        isVerified: false,
      },
    });

    return new User(response);
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
