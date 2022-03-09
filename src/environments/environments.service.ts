import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { Environment } from './entities/environment.entity';

@Injectable()
export class EnvironmentsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createEnvironmentDto: CreateEnvironmentDto,
  ): Promise<Environment> {
    const response = await this.prisma.environment
      .create({
        data: createEnvironmentDto,
      })
      .catch((reason) => {
        throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return new Environment(response);
  }

  async findAll() {
    const response = await this.prisma.environment
      .findMany()
      .catch((reason) => {
        throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return response.map((each) => new Environment(each));
  }

  async findOne(id: number) {
    const response = await this.prisma.environment
      .findUnique({
        where: { id },
      })
      .catch((reason) => {
        throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return new Environment(response);
  }

  async update(id: number, updateEnvironmentDto: UpdateEnvironmentDto) {
    const response = await this.prisma.environment
      .update({
        where: { id },
        data: updateEnvironmentDto,
      })
      .catch((reason) => {
        throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return new Environment(response);
  }

  async remove(id: number) {
    await this.prisma.environment.delete({ where: { id } }).catch((reason) => {
      throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    return 'Environment successfully deleted';
  }
}
