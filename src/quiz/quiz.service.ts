import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Quiz from './quiz.entity';
import { Repository } from 'typeorm';
import CreateQuizDto from './dto/createQuiz.dto';
import UpdateQuizDto from './dto/updateQuiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async create(quizDto: CreateQuizDto): Promise<Quiz> {
    const newQuiz = await this.quizRepository.create(quizDto);
    await this.quizRepository.save(newQuiz);
    return newQuiz;
  }

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }

  async findById(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne(id);
    if (quiz) return quiz;
    throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, quizDto: UpdateQuizDto): Promise<Quiz> {
    await this.quizRepository.update(id, quizDto);
    const updatedQuiz = await this.quizRepository.findOne(id);
    if (updatedQuiz) return updatedQuiz;
    throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: number): Promise<void> {
    const deleteQuiz = await this.quizRepository.delete(id);
    if (!deleteQuiz.affected)
      throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
  }
}
