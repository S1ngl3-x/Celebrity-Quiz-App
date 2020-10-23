import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}

export default CreateUserDto;
