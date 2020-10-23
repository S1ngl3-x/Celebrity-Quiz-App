import { NotFoundException } from '@nestjs/common';

class QuizNotFoundException extends NotFoundException {
  constructor(quizId: number) {
    super(`Quiz with id ${quizId} was not found`);
  }
}

export default QuizNotFoundException;
