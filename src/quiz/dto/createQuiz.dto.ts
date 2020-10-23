import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  result: number;
}

export default CreateQuizDto;
