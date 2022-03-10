import { Prisma } from '@prisma/client';
import { Expose } from 'class-transformer';

export class Category implements Prisma.CategoryUncheckedCreateInput {
  @Expose()
  id: number;

  @Expose()
  environmentId: number;

  @Expose()
  name: string;

  @Expose()
  image?: string;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
