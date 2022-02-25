import { compare, hash } from 'bcrypt';
const saltRounds = 12;

export const hashPassword = (password: string): Promise<string> =>
  hash(password, saltRounds);

export const comparePassword = (
  password: string,
  hashedPassword: string,
): Promise<boolean> => compare(password, hashedPassword);
