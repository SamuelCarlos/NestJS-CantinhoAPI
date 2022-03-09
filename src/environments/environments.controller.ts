import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';

@Controller('environments')
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Get()
  findAll() {
    return this.environmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.environmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEnvironmentDto: UpdateEnvironmentDto,
  ) {
    return this.environmentsService.update(id, updateEnvironmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.environmentsService.remove(id);
  }
}
