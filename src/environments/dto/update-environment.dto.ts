import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateEnvironmentDto } from './create-environment.dto';

export class UpdateEnvironmentDto extends PartialType(CreateEnvironmentDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  logo?: string;
}
