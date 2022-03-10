import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfirmSMSDto } from './dto/confirm-sms.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create({ ...createUserDto, isAdmin: false });
  }

  @Post('/admin')
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createAdmin({ ...createUserDto, isAdmin: true });
  }

  @Post('/confirm')
  confirmSMS(@Body() confirmSMSDto: ConfirmSMSDto) {
    return this.usersService.confirmSMS(confirmSMSDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
