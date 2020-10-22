import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/createUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto) {
    const newUser = await this.userRepository.create(userDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (user) return user;
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (user) return user;
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
