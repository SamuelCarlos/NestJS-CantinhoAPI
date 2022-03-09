import { Prisma } from '@prisma/client';
import { Expose } from 'class-transformer';

export class Environment implements Prisma.EnvironmentUncheckedCreateInput {
  @Expose()
  id?: number;

  @Expose()
  name: string;

  @Expose()
  logo?: string;

  constructor(partial: Partial<Environment>) {
    Object.assign(this, partial);
  }
}
