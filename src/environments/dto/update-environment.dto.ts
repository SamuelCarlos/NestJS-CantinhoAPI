import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateEnvironmentDto } from './create-environment.dto';

export class UpdateEnvironmentDto extends PartialType(CreateEnvironmentDto) {
  @IsString()
  name: string;

  @IsString()
  logo?: string;
}
