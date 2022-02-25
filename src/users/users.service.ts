import { Injectable } from '@nestjs/common';
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

  findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
