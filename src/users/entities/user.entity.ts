import { Prisma } from '@prisma/client';
import { Expose } from 'class-transformer';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number;
  environmentId: number;

  @Expose()
  name?: string;

  @Expose()
  phone: string;

  password: string;
  token?: string;
  isAdmin: boolean;

  @Expose()
  isVerified: boolean;

  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
