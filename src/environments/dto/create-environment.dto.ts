import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Environment } from '../entities/environment.entity';

export class CreateEnvironmentDto extends Environment {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  logo?: string;
}
