import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Quiz {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;
}

export default Quiz;
