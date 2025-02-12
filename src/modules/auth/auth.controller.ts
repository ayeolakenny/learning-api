import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthUser, LoginDto, SignupDto } from './auth.types';
import { Auth, AuthUser } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.auth.signup(dto);
  }

  @Auth()
  @Get('user')
  async getAuthUser(@AuthUser() user: IAuthUser) {
    return this.auth.authUser(user);
  }
}
