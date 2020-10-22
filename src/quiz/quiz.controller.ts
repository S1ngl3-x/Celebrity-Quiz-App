import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import Quiz from './quiz.entity';
import CreateQuizDto from './dto/createQuiz.dto';
import JwtAuthenticationGuard from '../authentication/guards/jwtAuthentication';

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
  findById(@Param('id') id: string): Promise<Quiz> {
    return this.quizService.findById(Number(id));
  }
}
