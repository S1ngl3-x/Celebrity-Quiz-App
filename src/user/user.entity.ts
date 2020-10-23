import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import Quiz from '../quiz/quiz.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToMany(() => Quiz, (quiz: Quiz) => quiz.user)
  public quizzes: Quiz[];
}

export default User;
