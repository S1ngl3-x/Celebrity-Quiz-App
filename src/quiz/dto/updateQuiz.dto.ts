import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class UpdateQuizDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;
}

export default UpdateQuizDto;
