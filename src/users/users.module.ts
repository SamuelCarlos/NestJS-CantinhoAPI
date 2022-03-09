import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsService } from 'src/aws/aws.service';
import { EnvironmentsService } from 'src/environments/environments.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AwsService, EnvironmentsService],
})
export class UsersModule {}
