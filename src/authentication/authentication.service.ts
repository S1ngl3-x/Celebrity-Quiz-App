import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import CreateUserDto from '../user/dto/createUserDto';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/postgresErrorCode.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './types/TokenPayload';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    try {
      return await this.userService.create({
        ...userDto,
        password: hashedPassword,
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email);
      await this.verifyPassword(password, user.password);
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }
  }
}
