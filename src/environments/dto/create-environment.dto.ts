import { IsOptional, IsString } from 'class-validator';
import { Environment } from '../entities/environment.entity';

export class CreateEnvironmentDto extends Environment {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  logo?: string;
}
