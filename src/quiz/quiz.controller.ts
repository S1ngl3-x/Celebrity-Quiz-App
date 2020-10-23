import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import Quiz from './quiz.entity';
import CreateQuizDto from './dto/createQuiz.dto';
import JwtAuthenticationGuard from '../authentication/guards/jwtAuthentication';
import FindOneParams from '../utils/params/findOneParams';
import UpdateQuizDto from './dto/updateQuiz.dto';

@Controller('quiz')
@UseGuards(JwtAuthenticationGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('/')
  create(@Body() quizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizService.create(quizDto);
  }

  @Get('/')
  findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }

  @Get(':id')
  findById(@Param() { id }: FindOneParams): Promise<Quiz> {
    return this.quizService.findById(Number(id));
  }

  @Patch(':id')
  updatePost(@Param() { id }: FindOneParams, @Body() quiz: UpdateQuizDto) {
    return this.quizService.update(Number(id), quiz);
  }

  @Delete(':id')
  deletePost(@Param() { id }: FindOneParams) {
    return this.quizService.delete(Number(id));
  }
}
