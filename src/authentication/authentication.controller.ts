import { Body, Req, Controller, HttpCode, Post, UseGuards, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import CreateUserDto from '../user/dto/createUserDto';
import RequestWithUser from './types/requestWithUser';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import JwtAuthenticationGuard from './guards/jwtAuthentication';
import User from '../user/user.entity';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<User> {
    return this.authenticationService.register(userDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser): Promise<User> {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser): Promise<void> {
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
