import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { bad, mustHave } from 'src/utils/error.utils';
import { PrismaService } from '../prisma/prisma.service';
import { AuthPayload, IAuthUser, LoginDto, SignupDto } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    mustHave(user, 'Invalid Credentials', 401);

    const passHash = user.passHash;
    if (!passHash) bad('Invalid Credentials', 401);

    const matched = await verify(passHash, password);
    if (!matched) bad('Invalid Credentials', 401);

    // Cant login if user has no role
    if (!user.role) bad('No roles assigned', 401);

    const payload: AuthPayload = {
      sub: user.id,
    };

    const token = await this.jwt.signAsync(payload);

    return { token };
  }

  async authUser(user: IAuthUser) {
    const authUser = await this.prisma.user.findUnique({
      where: { id: user.sub },
    });
    const { passHash, ...rest } = authUser;
    return rest;
  }

  async signup(dto: SignupDto) {
    const { email, password, name } = dto;

    const userExist = await this.prisma.user.findUnique({ where: { email } });
    if (userExist) bad('Email already exist');

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        passHash: await hash(password),
      },
    });

    const { passHash, ...rest } = user;

    return rest;
  }
}
