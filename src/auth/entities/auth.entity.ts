import { Expose } from 'class-transformer';

export class Auth {
  @Expose()
  accessToken: string;

  constructor(partial: Partial<Auth>) {
    Object.assign(this, partial);
  }
}
