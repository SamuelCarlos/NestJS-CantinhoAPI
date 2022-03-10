import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { comparePassword } from 'src/utils';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login({ phone, password }: LoginDto): Promise<Auth> {
    const user = await this.prisma.user.findUnique({ where: { phone } });

    if (!user) throw new NotFoundException('No user found for this phone.');

    const passwordValid = await comparePassword(password, user.password);

    if (!passwordValid) throw new UnauthorizedException('Invalid password');

    const token = this.jwtService.sign({ userId: user.id });

    return new Auth({ accessToken: token });
  }

  async validateUser(userId: number) {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }
}
