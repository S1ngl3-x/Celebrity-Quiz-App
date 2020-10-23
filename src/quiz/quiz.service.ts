import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Quiz from './quiz.entity';
import { Repository } from 'typeorm';
import CreateQuizDto from './dto/createQuiz.dto';
import UpdateQuizDto from './dto/updateQuiz.dto';
import QuizNotFoundException from './exceptions/quizNotFound.exception';
import User from '../user/user.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async create(quizDto: CreateQuizDto, user: User): Promise<Quiz> {
    const newQuiz = await this.quizRepository.create({
      ...quizDto,
      user: user,
    });
    await this.quizRepository.save(newQuiz);
    return newQuiz;
  }

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.find({ relations: ['user'] });
  }

  async findById(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne(id, { relations: ['user'] });
    if (quiz) return quiz;
    throw new QuizNotFoundException(id);
  }

  async update(id: number, quizDto: UpdateQuizDto): Promise<Quiz> {
    await this.quizRepository.update(id, quizDto);
    const updatedQuiz = await this.quizRepository.findOne(id, { relations: ['user'] });
    if (updatedQuiz) return updatedQuiz;
    throw new QuizNotFoundException(id);
  }

  async delete(id: number): Promise<void> {
    const deleteQuiz = await this.quizRepository.delete(id);
    if (!deleteQuiz.affected) throw new QuizNotFoundException(id);
  }
}
