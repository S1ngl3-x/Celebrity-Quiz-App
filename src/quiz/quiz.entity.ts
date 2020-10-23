import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user.entity';

@Entity()
class Quiz {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public result?: number;

  @ManyToOne(() => User, (user: User) => user.quizzes)
  @JoinTable()
  public user: User;
}

export default Quiz;
