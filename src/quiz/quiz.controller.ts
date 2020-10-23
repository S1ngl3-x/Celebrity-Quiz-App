import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import Quiz from './quiz.entity';
import CreateQuizDto from './dto/createQuiz.dto';
import JwtAuthenticationGuard from '../authentication/guards/jwtAuthentication';
import FindOneParams from '../utils/params/findOneParams';
import UpdateQuizDto from './dto/updateQuiz.dto';
import RequestWithUser from '../authentication/types/requestWithUser';

@Controller('quiz')
@UseGuards(JwtAuthenticationGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('/')
  create(@Body() quizDto: CreateQuizDto, @Req() req: RequestWithUser): Promise<Quiz> {
    return this.quizService.create(quizDto, req.user);
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
